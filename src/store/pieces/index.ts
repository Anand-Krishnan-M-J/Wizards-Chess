import { createSlice } from '@reduxjs/toolkit'
import {
    type PieceState,
    type PieceReduxState,
    type MovePieceSiceType,
    pieceTypeColor,
    type pieceName,
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
import { type ColName, type RowName } from '../../types'

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
            // When it's a killer move, remove the piece already present there
            // logic  -> If a piece already exist in the to be moved square, kill it
            const { col, row, name } = action.payload
            const pieceToKill = state.pieces.find(
                (piece: {
                    currentCol: ColName
                    currentRow: RowName
                    kia: boolean
                }) =>
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
                (item: { name: pieceName }) => item.name === name
            ) as PieceState
            pieceToMove.currentCol = col
            pieceToMove.currentRow = row

            // reset allowed pieces and selected piece once move is done
            state.allowedMovesForSelectedPiece = []
            state.selectedPiece = null
            state.attackablePositions = []

            if (isWhitePiece(action.payload.name)) {
                state.currentMoveIsOf = pieceTypeColor.black
            } else {
                state.currentMoveIsOf = pieceTypeColor.white
            }
        },
    },
})

export const { movePiece, selectPiece } = pieceSlice.actions
