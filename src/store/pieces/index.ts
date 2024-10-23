import { createSlice } from '@reduxjs/toolkit'
import {
    type PieceState,
    type PieceReduxState,
    type MovePieceSiceType,
    pieceTypeColor,
    pieceTypes,
} from './types'
import {
    getInitialBishopState,
    getInitialKingState,
    getInitialKnightState,
    getInitialPawnState,
    getInitialQueenState,
    getInitialRookState,
} from './initial'
import { getAllowedMoves, isWhitePiece } from '../../helpers'
import { ColName, type RowName } from '../../types'

export const intialState: PieceReduxState = {
    // Black and white pieces initial state
    pieces: [
        ...getInitialPawnState(),
        ...getInitialKingState(),
        ...getInitialQueenState(),
        ...getInitialRookState(),
        ...getInitialBishopState(),
        ...getInitialKnightState(),
    ],
    hoveredPiece: null,
    selectedPiece: null,
    allowedMovesForSelectedPiece: [],
    attackablePositions: [],
    currentMoveIsOf: pieceTypeColor.white,
}

export const pieceSlice: MovePieceSiceType = createSlice({
    name: 'Piece',
    initialState: intialState,
    reducers: {
        updateState: (state: PieceReduxState, action) => {
            state.allowedMovesForSelectedPiece =
                action.payload.allowedMovesForSelectedPiece
            state.attackablePositions = action.payload.attackablePositions
            state.currentMoveIsOf = action.payload.currentMoveIsOf
            state.hoveredPiece = action.payload.hoveredPiece
            state.pieces = action.payload.pieces
            state.selectedPiece = action.payload.selectedPiece
        },

        hoverPiece: (state: PieceReduxState, action) => {
            state.hoveredPiece = action.payload.name
        },

        selectPiece: (state: PieceReduxState, action) => {
            state.selectedPiece = action.payload.name
            // when a piece is selected update the allowed moves here
            if (action.payload.name != null) {
                const { attackablePositionOccupiedByEnemy, allowedMoves } =
                    getAllowedMoves(
                        action.payload.pieces as PieceState[],
                        action.payload.name
                    )
                // Update the states
                state.allowedMovesForSelectedPiece = allowedMoves
                state.attackablePositions = attackablePositionOccupiedByEnemy
            } else {
                state.allowedMovesForSelectedPiece = []
                state.attackablePositions = []
            }
        },

        movePiece: (state: PieceReduxState, action) => {
            const { col, row, name } = action.payload
            // When it's a killer move, remove the piece already present there
            const pieceToKill = state.pieces.find(
                (piece) =>
                    piece.currentCol === col &&
                    piece.currentRow === row &&
                    !piece.kia
            ) as PieceState
            if (pieceToKill !== undefined) {
                pieceToKill.kia = true
                pieceToKill.currentCol = undefined as unknown as ColName
                pieceToKill.currentRow = undefined as unknown as RowName
            }
            // Move the piece
            const pieceToMove = state.pieces.find(
                (item) => item.name === name
            ) as PieceState

            // Handle castling move
            if (
                pieceToMove.type === pieceTypes.king &&
                pieceToMove.isCastlingAllowed
            ) {
                // Check for kingside castling
                if (col === ColName.G) {
                    // Move the rook to F (kingside)
                    const rookToMove = state.pieces.find(
                        (piece) =>
                            piece.type === pieceTypes.rook &&
                            piece.currentCol === ColName.H &&
                            piece.currentRow === pieceToMove.currentRow
                    ) as PieceState
                    if (rookToMove) {
                        rookToMove.currentCol = ColName.F
                        rookToMove.currentRow = row // Ensure it's on the same row as the king
                    }
                }
                // Check for queenside castling
                else if (col === ColName.C) {
                    // Move the rook to D (queenside)
                    const rookToMove = state.pieces.find(
                        (piece) =>
                            piece.type === pieceTypes.rook &&
                            piece.currentCol === ColName.A &&
                            piece.currentRow === pieceToMove.currentRow
                    ) as PieceState
                    if (rookToMove) {
                        rookToMove.currentCol = ColName.D
                        rookToMove.currentRow = row // Ensure it's on the same row as the king
                    }
                }
                //Can't castle again & only king has this state
                pieceToMove.isCastlingAllowed.long = false
                pieceToMove.isCastlingAllowed.short = false
            }
            //If rook is moved once-> no more castling
            if (pieceToMove.type === pieceTypes.rook) {
                //update kings castling state
                const isKingSide = pieceToMove.currentCol === ColName.H

                const king = state.pieces.find(
                    (piece) =>
                        piece.currentRow === pieceToMove.currentRow &&
                        piece.type === pieceTypes.king
                )
                console.log(king?.isCastlingAllowed,"pppp")
                if (king?.isCastlingAllowed) {
                    if (isKingSide) {
                        king.isCastlingAllowed.short = false
                    } else {
                        king.isCastlingAllowed.long = false
                    }
                }
            }

            //Move pieces
            pieceToMove.currentCol = col
            pieceToMove.currentRow = row
            // Reset allowed pieces and selected piece once the move is done
            state.allowedMovesForSelectedPiece = []
            state.selectedPiece = null
            state.attackablePositions = []

            // Switch turns
            if (isWhitePiece(action.payload.name)) {
                state.currentMoveIsOf = pieceTypeColor.black
            } else {
                state.currentMoveIsOf = pieceTypeColor.white
            }
        },
    },
})

export const { movePiece, selectPiece, updateState } = pieceSlice.actions
