import { Slice, PayloadAction } from '@reduxjs/toolkit';
import { PieceReduxState } from '../pieces/types';

export interface firebaseStateType {
    isLoading: boolean
    error: string
}
export interface firebasePayloadType {
    gameState: PieceReduxState
  }
export type firebaseSiceType = Slice<
    firebaseStateType,
    {
        updateGameStateFirebaseRequest: (
            state: firebaseStateType,
            action: PayloadAction<firebasePayloadType>
        ) => void;
        updateGameStateFirebaseRequestSuccess: (
            state: firebaseStateType
        ) => void;
        updateGameStateFirebaseRequestFailed: (
            state: firebaseStateType
        ) => void;
    }
>;
