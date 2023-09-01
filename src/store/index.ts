import { configureStore } from '@reduxjs/toolkit'
import { pieceSlice } from './pieces'

export const store = configureStore({
    reducer: {
        pieces: pieceSlice.reducer,
    },
})
