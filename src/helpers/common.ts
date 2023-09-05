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
            (item) => item.currentCol === col && item.currentRow === row
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

export const allSquaresOccupiedByEnemy = (
    pieceType: pieceTypeColor,
    pieces: PieceState[]
) => {
    if (pieceType === pieceTypeColor.black) {
        return pieces.filter((piece) => !isWhitePiece(piece.name))
    } else {
        return pieces.filter((piece) => isWhitePiece(piece.name))
    }
}
