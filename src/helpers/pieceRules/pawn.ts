import { isWhitePiece } from '..'
import { colNames } from '../../constants/pieces'
import {
    type PieceState,
    type pieceName,
    pieceTypeColor,
    pieceTypes,
} from '../../store/pieces/types'
import { type ColName, RowName } from '../../types'
import {
    allEnemies,
    getColArrayIndex,
    getRowArrayIndex,
    isPositionIndexInRange,
    isSquareOccupied,
    rowNamesInBoardOrder,
} from '../common'

const getNextRowName = (currentRow: RowName, isWhitePiece: boolean) => {
    if (isWhitePiece) {
        return rowNamesInBoardOrder[getRowArrayIndex(currentRow) + 1]
    }
    return rowNamesInBoardOrder[getRowArrayIndex(currentRow) - 1]
}
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

export const getPawnMoves = (
    name: pieceName,
    currentCol: ColName,
    currentRow: RowName,
    pieces: PieceState[]
) => {
    let allowedMoves: Array<{ col: ColName; row: RowName }> = []

    // Check if the piece is white
    const isWhite = isWhitePiece(name)

    // White Pawns Logic
    if (isWhite) {
        // If on row 2, allowed moves will be 2 rows up ahead within the same column
        if (currentRow === RowName.two) {
            if (!isSquareOccupied(currentCol, RowName.three, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.three })
            }
            if (!isSquareOccupied(currentCol, RowName.four, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.four })
            }
        }
        // If on any other row, can move only 1 step ahead
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
    } else {
        // Black Pawns Logic
        // If on row 7, allowed moves will be 2 rows up ahead within the same column
        if (currentRow === RowName.seven) {
            if (!isSquareOccupied(currentCol, RowName.six, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.six })
            }
            if (!isSquareOccupied(currentCol, RowName.five, pieces)) {
                allowedMoves.push({ col: currentCol, row: RowName.five })
            }
        } else {
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

    // Attackable positions
    const attackablePositions = getAttackablePositions(
        name,
        currentCol,
        currentRow
    ).map((item) => `${item.col}${item.row}`)

    // Determine piece color
    const pieceColor = isWhite ? pieceTypeColor.white : pieceTypeColor.black

    // Get all enemy pieces
    const enemyPieces = allEnemies(pieceColor, pieces)

    // Filter out enemy kings from attackable positions
    const attackablePositionOccupiedByEnemy = enemyPieces
        .filter((item) => {
            const isKing = item.type === pieceTypes.king // Check if the piece type is king
            return (
                attackablePositions.includes(
                    `${item.currentCol}${item.currentRow}`
                ) && !isKing
            )
        })
        .map((item) => ({
            col: item.currentCol,
            row: item.currentRow,
        }))

    // Combine allowed moves and attackable positions
    allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy]

    return { allowedMoves, attackablePositionOccupiedByEnemy }
}
