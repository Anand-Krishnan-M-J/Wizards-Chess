import React from 'react'
import { type ThreeEvent } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store/types'
import { getCordinates } from '../../store/pieces/positionMapping'
import { selectPiece } from '../../store/pieces'
import { type pieceName } from '../../store/pieces/types'
import { Piece } from '../../atoms/Pieces'

export const PieceRenderer: React.FC = () => {
    const { pieces, selectedPiece } = useSelector(
        (state: RootState) => state.pieces
    )
    const dispatch = useDispatch()
    const handleSelect = (name: pieceName) => {
        if (selectedPiece === name) {
            dispatch(selectPiece({ name: null }))
        } else {
            dispatch(selectPiece({ name }))
        }
    }
    return (
        <>
            <group>
                {pieces.map((piece) => {
                    return (
                        <Piece
                            onClick={(e: ThreeEvent<MouseEvent>) => {
                                e.stopPropagation()
                                handleSelect(piece.name)
                            }}
                            key={piece.name}
                            position={getCordinates(
                                piece.currentRow,
                                piece.currentCol
                            )}
                            type={piece.type}
                            name={piece.name}
                        />
                    )
                })}
            </group>
        </>
    )
}
