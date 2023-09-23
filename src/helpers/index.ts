import {
    type PieceState,
    pieceTypes,
    type pieceName,
} from '../store/pieces/types'
import { type ColName, type RowName } from '../types'
import { getPawnMoves } from './pieceRules/pawn'
import { getRookMoves } from './pieceRules/rook'

export const isWhitePiece = (name: pieceName) => name.split('_')[1] === 'W'
interface position {
    col: ColName
    row: RowName
}
export const getAllowedMoves = (
    pieces: PieceState[],
    name: pieceName
): {
    allowedMoves: position[]
    attackablePositionOccupiedByEnemy: position[]
} => {
    const selectedPiece = pieces.find((piece) => piece.name === name)
    const { currentCol, currentRow, type } = selectedPiece as PieceState
    if (type === pieceTypes.pawn) {
        return getPawnMoves(name, currentCol, currentRow, pieces)
    } else if (type === pieceTypes.rook) {
        return getRookMoves(name, currentCol, currentRow, pieces)
    }
    return { allowedMoves: [], attackablePositionOccupiedByEnemy: [] }
}
