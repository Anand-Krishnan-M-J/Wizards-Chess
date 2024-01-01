import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { firebasePayloadType, firebaseSiceType, firebaseStateType } from './types';


const intialState: firebaseStateType = {
    isLoading: false,
    error: "",
};

export const firebaseSlice: firebaseSiceType = createSlice({
    name: 'Firebase',
    initialState: intialState,
    reducers: {
        updateGameStateFirebaseRequest: (state, action: PayloadAction<firebasePayloadType>) => {
            state.isLoading = true;
           
        },
        updateGameStateFirebaseRequestSuccess: (
            state: firebaseStateType
           ) => {
            state.isLoading = false;
        },
        updateGameStateFirebaseRequestFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    updateGameStateFirebaseRequest,
    updateGameStateFirebaseRequestSuccess,
    updateGameStateFirebaseRequestFailed
} = firebaseSlice.actions;
