import React from 'react'
import { type ThreeEvent } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store/types'
import { getCordinates } from '../../store/pieces/positionMapping'
import { selectPiece } from '../../store/pieces'
import { pieceTypeColor, type pieceName } from '../../store/pieces/types'
import { Piece } from '../../atoms/Pieces'
import { isWhitePiece } from '../../helpers'

export const PieceRenderer: React.FC = () => {
    const { pieces, selectedPiece, currentMoveIsOf } = useSelector(
        (state: RootState) => state.pieces
    )
    const dispatch = useDispatch()
    // select a piece
    const handleSelect = (name: pieceName) => {
        if (selectedPiece === name) {
            dispatch(selectPiece({ name: null }))
        } else {
            dispatch(selectPiece({ name, pieces }))
        }
    }
    return (
        <>
            <group>
                {pieces
                    .filter((piece) => !piece.kia)
                    .map((piece) => {
                        return (
                            <Piece
                                onClick={(e: ThreeEvent<MouseEvent>) => {
                                    e.stopPropagation()
                                    // Disable enemy move, when it's not their move
                                    const shouldEnableClick =
                                        (isWhitePiece(piece.name) &&
                                            currentMoveIsOf ===
                                                pieceTypeColor.white) ||
                                        (!isWhitePiece(piece.name) &&
                                            currentMoveIsOf ===
                                                pieceTypeColor.black)
                                    if (shouldEnableClick) {
                                        handleSelect(piece.name)
                                    }
                                }}
                                key={piece.name}
                                position={getCordinates(
                                    piece.currentRow,
                                    piece.currentCol
                                )}
                                col={piece.currentCol}
                                row={piece.currentRow}
                                type={piece.type}
                                name={piece.name}
                            />
                        )
                    })}
            </group>
        </>
    )
}
