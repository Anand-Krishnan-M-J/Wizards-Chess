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
        },

        movePiece: (state: PieceReduxState, action) => {
            ;(
                state.pieces.find(
                    (item) => item.name === action.payload.name
                ) as PieceState
            ).currentCol = action.payload.col

            ;(
                state.pieces.find(
                    (item) => item.name === action.payload.name
                ) as PieceState
            ).currentRow = action.payload.row
        },
    },
})

export const { movePiece, selectPiece } = pieceSlice.actions
