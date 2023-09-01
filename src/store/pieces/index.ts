import { createSlice } from '@reduxjs/toolkit'
import {
    type PieceState,
    type InitialState,
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

export const intialState: InitialState = [
    // Black and white pieces initial state
    ...getInitialPawnState(),
    ...getInitialKingState(),
    ...getInitialQueenState(),
    ...getInitialRookState(),
    ...getInitialBishopState(),
    ...getInitialKnightState(),
]

export const pieceSlice: MovePieceSiceType = createSlice({
    name: 'Piece',
    initialState: intialState,
    reducers: {
        movePiece: (state: InitialState, action) => {
            ;(
                state.find(
                    (item) => item.name === action.payload.name
                ) as PieceState
            ).currentCol = action.payload.col
            ;(
                state.find(
                    (item) => item.name === action.payload.name
                ) as PieceState
            ).currentRow = action.payload.row
        },
    },
})

export const { movePiece } = pieceSlice.actions
