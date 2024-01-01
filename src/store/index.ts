import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit'
import { pieceSlice } from './pieces'
import { rootSaga } from '@/saga';
import { firebaseSlice } from './firebase';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        pieces: pieceSlice.reducer,
        firebase: firebaseSlice.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga);
