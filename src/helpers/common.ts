import { isWhitePiece } from '.'
import { colNames, rowNames } from '../constants/pieces'
import { type PieceState, pieceTypeColor } from '../store/pieces/types'
import { type ColName, type RowName } from '../types'

export const isSquareOccupied = (
    col: ColName,
    row: RowName,
    pieces: PieceState[]
) => {
    return (
        pieces.find(
            (item) =>
                item.currentCol === col && item.currentRow === row && !item.kia
        ) !== undefined
    )
}

export const isSquareOccupiedByEnemy = (
    col: ColName,
    row: RowName,
    pieces: PieceState[],
    enemyType: pieceTypeColor
) => {
    return (
        pieces.find(
            (item) =>
                item.currentCol === col &&
                item.currentRow === row &&
                !item.kia &&
                (enemyType === pieceTypeColor.white
                    ? isWhitePiece(item.name)
                    : !isWhitePiece(item.name))
        ) !== undefined
    )
}
export const isSquareOccupiedByFriendly = (
    col: ColName,
    row: RowName,
    pieces: PieceState[],
    currentPieceType: pieceTypeColor
) => {
    return (
        pieces.find(
            (item) =>
                item.currentCol === col &&
                item.currentRow === row &&
                !item.kia &&
                (currentPieceType === pieceTypeColor.white
                    ? isWhitePiece(item.name)
                    : !isWhitePiece(item.name))
        ) !== undefined
    )
}

export const rowNamesInBoardOrder = [...rowNames].reverse()

export const getRowArrayIndex = (row: RowName) => {
    return rowNamesInBoardOrder.indexOf(row)
}

export const getColArrayIndex = (col: ColName) => {
    return colNames.indexOf(col)
}

// pieceType is of enemy's
export const allEnemies = (pieceType: pieceTypeColor, pieces: PieceState[]) => {
    if (pieceType === pieceTypeColor.black) {
        return pieces.filter((piece) => !isWhitePiece(piece.name) && !piece.kia)
    } else {
        return pieces.filter((piece) => isWhitePiece(piece.name) && !piece.kia)
    }
}
export const isPositionIndexInRange = (index: number) => index >= 0 && index < 8
export const isServer = typeof window === "undefined";
