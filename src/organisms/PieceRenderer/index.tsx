import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store/types'
import { GetPiece } from './ComponentMapping'
import { getCordinates } from '../../store/pieces/positionMapping'
import { movePiece } from '../../store/pieces'
import { type pieceName } from '../../store/pieces/types'
import { ColName, RowName } from '../../types'

export const PieceRenderer: React.FC = () => {
    const pieces = useSelector((state: RootState) => state.pieces)
    const dispatch = useDispatch()
    const handleMove = (name: pieceName) => {
        dispatch(movePiece({ name, col: ColName.D, row: RowName.four }))
    }

    return (
        <>
            <group>
                {pieces.map((piece) => {
                    const Piece = GetPiece(piece.name)
                    return (
                        <Piece
                            onClick={() => {
                                handleMove(piece.name)
                            }}
                            key={piece.name}
                            position={getCordinates(
                                piece.currentRow,
                                piece.currentCol
                            )}
                        />
                    )
                })}
            </group>
        </>
    )
}
