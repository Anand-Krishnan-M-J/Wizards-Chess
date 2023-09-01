import { BlackBishop } from '../../atoms/Pieces/Black/Bishop'
import { BlackKnight } from '../../atoms/Pieces/Black/Knight'
import { BlackPawn } from '../../atoms/Pieces/Black/Pawn'
import { BlackQueen } from '../../atoms/Pieces/Black/Queen'
import { BlackRook } from '../../atoms/Pieces/Black/Rook'
import { BlackKing } from '../../atoms/Pieces/Black/king'
import { WhiteBishop } from '../../atoms/Pieces/White/Bishop'
import { WhiteKnight } from '../../atoms/Pieces/White/Knight'
import { WhitePawn } from '../../atoms/Pieces/White/Pawn'
import { WhiteRook } from '../../atoms/Pieces/White/Rook'
import { WhiteKing } from '../../atoms/Pieces/White/king'
import { WhiteQueen } from '../../atoms/Pieces/White/queen'
import { pieceName } from '../../store/pieces/types'

export const GetPiece = (componentName: pieceName) => {
    switch (componentName) {
        // Pawns
        case pieceName.Pawn2A_W:
        case pieceName.Pawn2B_W:
        case pieceName.Pawn2C_W:
        case pieceName.Pawn2D_W:
        case pieceName.Pawn2E_W:
        case pieceName.Pawn2F_W:
        case pieceName.Pawn2G_W:
        case pieceName.Pawn2H_W:
            return WhitePawn
        case pieceName.Pawn7A_B:
        case pieceName.Pawn7B_B:
        case pieceName.Pawn7C_B:
        case pieceName.Pawn7D_B:
        case pieceName.Pawn7E_B:
        case pieceName.Pawn7F_B:
        case pieceName.Pawn7G_B:
        case pieceName.Pawn7H_B:
            return BlackPawn
        // King
        case pieceName.King_W:
            return WhiteKing
        case pieceName.King_B:
            return BlackKing
        // Queen
        case pieceName.Queen_W:
            return WhiteQueen
        case pieceName.Queen_B:
            return BlackQueen
        // Rook
        case pieceName.Rook1A_W:
        case pieceName.Rook1H_W:
            return WhiteRook

        case pieceName.Rook8A_B:
        case pieceName.Rook8H_B:
            return BlackRook
        // Bishop
        case pieceName.Bishop1C_W:
        case pieceName.Bishop1F_W:
            return WhiteBishop

        case pieceName.Bishop8C_B:
        case pieceName.Bishop8F_B:
            return BlackBishop
        // Knight
        case pieceName.Knight1B_W:
        case pieceName.Knight1G_W:
            return WhiteKnight

        case pieceName.Knight8B_B:
        case pieceName.Knight8G_B:
            return BlackKnight
    }
}
