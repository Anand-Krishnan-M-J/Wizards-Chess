import { type PayloadAction, type Slice } from '@reduxjs/toolkit'
import { type ColName, type RowName } from '../../types'

export enum pieceTypes {
    pawn = 'pawn',
    king = 'king',
    queen = 'queen',
    rook = 'rook',
    bishop = 'bishop',
    knight = 'knight',
}
export enum pieceName {
    // White
    Pawn2A_W = 'Pawn2A_W',
    Pawn2B_W = 'Pawn2B_W',
    Pawn2C_W = 'Pawn2C_W',
    Pawn2D_W = 'Pawn2D_W',
    Pawn2E_W = 'Pawn2E_W',
    Pawn2F_W = 'Pawn2F_W',
    Pawn2G_W = 'Pawn2G_W',
    Pawn2H_W = 'Pawn2H_W',
    // King
    King_W = 'King_W',
    // Queen
    Queen_W = 'Queen_W',
    // Rooks
    Rook1A_W = 'Rook1A_W',
    Rook1H_W = 'Rook1H_W',
    // Bishops
    Bishop1C_W = 'Bishop1C_W',
    Bishop1F_W = 'Bishop1F_W',
    // Knights="Pawn2A_W",
    Knight1B_W = 'Knight1B_W',
    Knight1G_W = 'Knight1G_W',

    // Black
    Pawn7A_B = 'Pawn7A_B',
    Pawn7B_B = 'Pawn7B_B',
    Pawn7C_B = 'Pawn7C_B',
    Pawn7D_B = 'Pawn7D_B',
    Pawn7E_B = 'Pawn7E_B',
    Pawn7F_B = 'Pawn7F_B',
    Pawn7G_B = 'Pawn7G_B',
    Pawn7H_B = 'Pawn7H_B',
    // King
    King_B = 'King_B',
    // Queen
    Queen_B = 'Queen_B',
    // Rooks
    Rook8A_B = 'Rook8A_B',
    Rook8H_B = 'Rook8H_B',
    // Bishops
    Bishop8C_B = 'Bishop8C_B',
    Bishop8F_B = 'Bishop8F_B',
    // Knights="Pawn2A_W",
    Knight8B_B = 'Knight8B_B',
    Knight8G_B = 'Knight8G_B',
}
export const whitePawns = [
    pieceName.Pawn2A_W,
    pieceName.Pawn2B_W,
    pieceName.Pawn2C_W,
    pieceName.Pawn2D_W,
    pieceName.Pawn2E_W,
    pieceName.Pawn2F_W,
    pieceName.Pawn2G_W,
    pieceName.Pawn2H_W,
]
export const blackPawns = [
    pieceName.Pawn7A_B,
    pieceName.Pawn7B_B,
    pieceName.Pawn7C_B,
    pieceName.Pawn7D_B,
    pieceName.Pawn7E_B,
    pieceName.Pawn7F_B,
    pieceName.Pawn7G_B,
    pieceName.Pawn7H_B,
]

export interface PieceState {
    name: pieceName
    type: pieceTypes
    // Current
    currentCol: ColName
    currentRow: RowName
    // Common
    kia: boolean
    isPromoted?: boolean
    promotedTo?: PromotionType
}
export type InitialState = PieceState[]

export interface movePiecePayload {
    col: ColName
    row: RowName
    name: pieceName
}

export type MovePieceSiceType = Slice<
    InitialState,
    {
        movePiece: (
            state: InitialState,
            action: PayloadAction<movePiecePayload>
        ) => void
    }
>
export type PromotionType =
    | pieceTypes.bishop
    | pieceTypes.knight
    | pieceTypes.rook
    | pieceTypes.queen
    | pieceTypes.rook
