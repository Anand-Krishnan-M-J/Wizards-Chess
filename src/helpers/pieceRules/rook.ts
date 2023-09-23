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
    rowNamesInBoardOrder,
} from '../common'

enum MovementType {
    incRow = 'incRow',
    decRow = 'decRow',
    incCol = 'incCol',
    decCol = 'decCol',
}
export const getRookMoves = (
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
        if (movementType === MovementType.incRow) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) + 1
                ]
        } else if (movementType === MovementType.decRow) {
            row =
                rowNamesInBoardOrder[
                    rowNamesInBoardOrder.indexOf(currentRow) - 1
                ]
        } else if (movementType === MovementType.incCol) {
            col = colNames[colNames.indexOf(currentCol) + 1]
        } else if (movementType === MovementType.decCol) {
            col = colNames[colNames.indexOf(currentCol) - 1]
        }

        const isRowMovement =
            movementType === MovementType.decRow ||
            movementType === MovementType.incRow
        // while the indexes are in range
        while (
            isPositionIndexInRange(
                isRowMovement ? getRowArrayIndex(row) : getColArrayIndex(col)
            )
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
            // if same type pawn is found break from loop
            if (isSquareOccupied(col, row, pieces)) {
                break
            }

            if (movementType === MovementType.incRow) {
                allowedMoves.push({ row, col: currentCol })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) + 1]
            } else if (movementType === MovementType.decRow) {
                allowedMoves.push({ row, col: currentCol })
                // iterate to next position
                row =
                    rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(row) - 1]
            } else if (movementType === MovementType.incCol) {
                allowedMoves.push({ row: currentRow, col })
                // iterate to next position
                col = colNames[colNames.indexOf(col) + 1]
            } else if (movementType === MovementType.decCol) {
                allowedMoves.push({ row: currentRow, col })
                // iterate to next position
                col = colNames[colNames.indexOf(col) - 1]
            }
        }
        col = currentCol
        row = currentRow
    }

    const movements = [
        { movementType: MovementType.incRow },
        { movementType: MovementType.decRow },
        { movementType: MovementType.incCol },
        { movementType: MovementType.decCol },
    ]
    // Get all movements in all directions
    movements.forEach((item) => {
        setAllowedMovesAndAttackablePositions(item.movementType)
    })

    // attackable positions are also allowed moves
    allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy]

    return { allowedMoves, attackablePositionOccupiedByEnemy }
}
