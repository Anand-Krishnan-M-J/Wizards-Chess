import { isWhitePiece } from '..'
import { colNames } from '../../constants/pieces'
import {
    type pieceName,
    type PieceState,
    pieceTypeColor,
} from '../../store/pieces/types'
import { type ColName, type RowName } from '../../types'
import {
    getColArrayIndex,
    getRowArrayIndex,
    isPositionIndexInRange,
    isSquareOccupied,
    isSquareOccupiedByEnemy,
    isSquareOccupiedByKing,
    rowNamesInBoardOrder,
} from '../common'

enum MovementType {
    incRowDecCol = 'incRowDecCol',
    incRowIncCol = 'incRowIncCol',
    decRowDecCol = 'decRowDecCol',
    decRowIncCol = 'decRowIncCol',
}
export const getBishopMoves = (
    name: pieceName,
    currentCol: ColName,
    currentRow: RowName,
    pieces: PieceState[]
) => {
    let allowedMoves: Array<{ col: ColName; row: RowName }> = []
    const attackablePositionOccupiedByEnemy: Array<{
        col: ColName
        row: RowName
    }> = []
    let row = currentRow
    let col = currentCol

    const setAllowedMovesAndAttackablePositions = (
        movementType: MovementType
    ) => {
        // initial positions of row and col to start checking for posible movable locations
        if (movementType === MovementType.incRowDecCol) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) + 1
                ]
            col = colNames[colNames.indexOf(currentCol) - 1]
        } else if (movementType === MovementType.incRowIncCol) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) + 1
                ]
            col = colNames[colNames.indexOf(currentCol) + 1]
        } else if (movementType === MovementType.decRowDecCol) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) - 1
                ]
            col = colNames[colNames.indexOf(currentCol) - 1]
        } else if (movementType === MovementType.decRowIncCol) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) - 1
                ]
            col = colNames[colNames.indexOf(currentCol) + 1]
        }

        // while the indexes are in range
        while (
            isPositionIndexInRange(getRowArrayIndex(row)) &&
            isPositionIndexInRange(getColArrayIndex(col)) &&
            !isSquareOccupiedByKing(col, row, pieces)
        ) {
            // if enemy is found add that to enemy list and break from loop and piece can't go any further
            if (
                isSquareOccupiedByEnemy(
                    col,
                    row,
                    pieces,
                    isWhitePiece(name)
                        ? pieceTypeColor.black
                        : pieceTypeColor.white
                )
            ) {
                attackablePositionOccupiedByEnemy.push({ col, row })
                break
            }
            // if same type piece is found break from loop
            if (isSquareOccupied(col, row, pieces)) {
                break
            }

            if (movementType === MovementType.incRowDecCol) {
                allowedMoves.push({ row, col })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) + 1]
                col = colNames[colNames.indexOf(col) - 1]
            } else if (movementType === MovementType.incRowIncCol) {
                allowedMoves.push({ row, col })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) + 1]
                col = colNames[colNames.indexOf(col) + 1]
            } else if (movementType === MovementType.decRowDecCol) {
                allowedMoves.push({ row, col })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) - 1]
                col = colNames[colNames.indexOf(col) - 1]
            } else if (movementType === MovementType.decRowIncCol) {
                allowedMoves.push({ row, col })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) - 1]
                col = colNames[colNames.indexOf(col) + 1]
            }
        }
        col = currentCol
        row = currentRow
    }

    const movements = [
        { movementType: MovementType.incRowDecCol },
        { movementType: MovementType.incRowIncCol },
        { movementType: MovementType.decRowDecCol },
        { movementType: MovementType.decRowIncCol },
    ]
    // Get all movements in all directions
    movements.forEach((item) => {
        setAllowedMovesAndAttackablePositions(item.movementType)
    })

    // attackable positions are also allowed moves
    allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy]

    return { allowedMoves, attackablePositionOccupiedByEnemy }
}
