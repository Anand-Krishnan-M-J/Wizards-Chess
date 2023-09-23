import { type pieceName, type PieceState } from '../../store/pieces/types'
import { type ColName, type RowName } from '../../types'
import { getBishopMoves } from './bishop'
import { getRookMoves } from './rook'

export const getQueenMoves = (
    name: pieceName,
    currentCol: ColName,
    currentRow: RowName,
    pieces: PieceState[]
) => {
    // Moves of queen are a combo of moves that rook and bishop can make
    const {
        allowedMoves: allowedStraightMoves,
        attackablePositionOccupiedByEnemy:
            attackableStraightPositionOccupiedByEnemy,
    } = getRookMoves(name, currentCol, currentRow, pieces)

    const {
        allowedMoves: allowedSlantedMoves,
        attackablePositionOccupiedByEnemy:
            attackableSlantedPositionOccupiedByEnemy,
    } = getBishopMoves(name, currentCol, currentRow, pieces)
    let allowedMoves = [...allowedStraightMoves, ...allowedSlantedMoves]

    const attackablePositionOccupiedByEnemy = [
        ...attackableStraightPositionOccupiedByEnemy,
        ...attackableSlantedPositionOccupiedByEnemy,
    ]

    allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy]
    return { allowedMoves, attackablePositionOccupiedByEnemy }
}
