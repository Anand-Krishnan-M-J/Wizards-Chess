import React from 'react'
import { config } from '../../config'
import { type props } from './types'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store/types'
import { type PieceState } from '../../store/pieces/types'

const thickness = 10
export const CheckerSquare: React.FC<props> = ({
    position,
    isDarkSquare,
    col,
    row,
}) => {
    let color = isDarkSquare ? '#8B4513' : 'white'
    const { selectedPiece, pieces } = useSelector(
        (state: RootState) => state.pieces
    )
    if (selectedPiece != null) {
        const { currentCol, currentRow } = pieces.find(
            (item) => item.name === selectedPiece
        ) as PieceState
        // selected piece position checker square
        if (currentCol === col && currentRow === row) {
            color = '#48260D'
        }
    }
    // const allowedSquares
    return (
        <mesh position={position}>
            <boxGeometry
                args={[config.square.size, thickness, config.square.size]}
            />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
