import { createSlice } from '@reduxjs/toolkit'
import {
    type PieceState,
    type PieceReduxState,
    type MovePieceSiceType,
} from './types'
import {
    getInitialBishopState,
    getInitialKingState,
    getInitialKnightState,
    getInitialPawnState,
    getInitialQueenState,
    getInitialRookState,
} from './initial'
import { getAllowedMoves } from '../../helpers'

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
            }
        },

        movePiece: (state: PieceReduxState, action) => {
            const pieceToMove = state.pieces.find(
                (item) => item.name === action.payload.name
            ) as PieceState
            pieceToMove.currentCol = action.payload.col
            pieceToMove.currentRow = action.payload.row

            // reset allowed pieces and selected piece once move is done
            state.allowedMovesForSelectedPiece = []
            state.selectedPiece = null
            state.attackablePositions = []
        },
    },
})

export const { movePiece, selectPiece } = pieceSlice.actions
