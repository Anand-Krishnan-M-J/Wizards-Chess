import { isWhitePiece } from '..'
import { colNames, rowNames } from '../../constants/pieces'
import {
    type PieceState,
    type pieceName,
    pieceTypeColor,
} from '../../store/pieces/types'
import { type ColName, RowName } from '../../types'

const rowNamesInBoardOrder = [...rowNames].reverse()

const getRowArrayIndex = (row: RowName) => {
    return rowNamesInBoardOrder.indexOf(row)
}

const getColArrayIndex = (col: ColName) => {
    return colNames.indexOf(col)
}

const getNextRowName = (currentRow: RowName, isWhitePiece: boolean) => {
    if (isWhitePiece) {
        return rowNamesInBoardOrder[getRowArrayIndex(currentRow) + 1]
    }
    return rowNamesInBoardOrder[getRowArrayIndex(currentRow) - 1]
}

const allSquaresOccupiedByEnemy = (
    pieceType: pieceTypeColor,
    pieces: PieceState[]
) => {
    if (pieceType === pieceTypeColor.black) {
        return pieces.filter((piece) => !isWhitePiece(piece.name))
    } else {
        return pieces.filter((piece) => isWhitePiece(piece.name))
    }
}

const isPositionIndexInRange = (index: number) => index >= 0 && index < 8

const getAttackablePositions = (
    name: pieceName,
    currentCol: ColName,
    currentRow: RowName
) => {
    if (isWhitePiece(name)) {
        const allowedPosition = []
        // enemy on to the right
        if (isPositionIndexInRange(colNames.indexOf(currentCol) + 1)) {
            allowedPosition.push({
                col: colNames[getColArrayIndex(currentCol) + 1],
                row: rowNamesInBoardOrder[getRowArrayIndex(currentRow) + 1],
            })
        }
        // enemy on to the left
        if (isPositionIndexInRange(colNames.indexOf(currentCol) - 1)) {
            allowedPosition.push({
                col: colNames[getColArrayIndex(currentCol) - 1],
                row: rowNamesInBoardOrder[getRowArrayIndex(currentRow) + 1],
            })
        }

        return allowedPosition
    } else {
        const allowedPosition = []
        // enemy on to the right
        if (isPositionIndexInRange(colNames.indexOf(currentCol) - 1)) {
            allowedPosition.push({
                col: colNames[getColArrayIndex(currentCol) - 1],
                row: rowNamesInBoardOrder[getRowArrayIndex(currentRow) - 1],
            })
        }
        // enemy on to the left
        if (isPositionIndexInRange(colNames.indexOf(currentCol) + 1)) {
            allowedPosition.push({
                col: colNames[getColArrayIndex(currentCol) + 1],
                row: rowNamesInBoardOrder[getRowArrayIndex(currentRow) - 1],
            })
        }

        return allowedPosition
    }
}

export const isSquareOccupied = (
    col: ColName,
    row: RowName,
    pieces: PieceState[]
) => {
    return (
        pieces.find(
            (item) => item.currentCol === col && item.currentRow === row
        ) === undefined
    )
}

export const getPawnMoves = (
    name: pieceName,
    currentCol: ColName,
    currentRow: RowName,
    pieces: PieceState[]
) => {
    let allowedMoves: Array<{ col: ColName; row: RowName }> = []

    // White
    if (isWhitePiece(name)) {
        // if on row 2, allowed moves will be 2 rows up ahead with in same column
        if (currentRow === RowName.two) {
            if (!isSquareOccupied(currentCol, RowName.three, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.three })
            }
            if (!isSquareOccupied(currentCol, RowName.four, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.four })
            }
        }
        // if on any other row, can move only 1 step ahead
        else {
            if (
                !isSquareOccupied(
                    currentCol,
                    getNextRowName(currentRow, true),
                    pieces
                )
            ) {
                allowedMoves.push({
                    col: currentCol,
                    row: getNextRowName(currentRow, true),
                })
            }
        }
    }

    // Black
    if (!isWhitePiece(name)) {
        // if on row 2, allowed moves will be 2 rows up ahead with in same column
        if (currentRow === RowName.seven) {
            // Forward move is disabled when a pawn is at front
            if (!isSquareOccupied(currentCol, RowName.six, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.six })
            }
            // Forward move is disabled when a pawn is at front
            if (!isSquareOccupied(currentCol, RowName.five, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.five })
            }
        }
        // For all other rows
        else {
            // Forward move is disabled when a pawn is at front
            if (
                !isSquareOccupied(
                    currentCol,
                    getNextRowName(currentRow, false),
                    pieces
                )
            ) {
                allowedMoves.push({
                    col: currentCol,
                    row: getNextRowName(currentRow, false),
                })
            }
        }
    }

    // attackable positions
    const attackablePositions = getAttackablePositions(
        name,
        currentCol,
        currentRow
    ).map((item) => `${item.col}${item.row}`)

    const pieceColor = isWhitePiece(name)
        ? pieceTypeColor.black
        : pieceTypeColor.white

    const attackablePositionOccupiedByEnemy = allSquaresOccupiedByEnemy(
        pieceColor,
        pieces
    )
        .filter((item) =>
            attackablePositions.includes(`${item.currentCol}${item.currentRow}`)
        )
        .map((item) => ({
            col: item.currentCol,
            row: item.currentRow,
        }))

    allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy]

    return { allowedMoves, attackablePositionOccupiedByEnemy }
}
