import { configureStore } from '@reduxjs/toolkit';
import { firebaseSlice } from './firebase';
import { pieceSlice } from './pieces';

export const store = configureStore({
  reducer: {
    pieces: pieceSlice.reducer,
    firebase: firebaseSlice.reducer,
  },
});
