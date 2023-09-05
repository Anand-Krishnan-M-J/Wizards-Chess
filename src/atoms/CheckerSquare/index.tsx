import React from 'react'
import { config } from '../../config'
import { type props } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store/types'
import { type pieceName, type PieceState } from '../../store/pieces/types'
import { vertexShader, fragmentShader } from './shader'
import { movePiece } from '../../store/pieces'

const thickness = 10

export const CheckerSquare: React.FC<props> = ({
    position,
    isDarkSquare,
    col,
    row,
}) => {
    const dispatch = useDispatch()
    const color = isDarkSquare ? '#8B4513' : 'white'
    const { selectedPiece, pieces, allowedMovesForSelectedPiece } = useSelector(
        (state: RootState) => state.pieces
    )

    // Highlight selected square
    let isSelectedPiece = false
    if (selectedPiece != null) {
        const { currentCol, currentRow } = pieces.find(
            (item) => item.name === selectedPiece
        ) as PieceState
        // selected piece position checker square
        if (currentCol === col && currentRow === row) {
            isSelectedPiece = true
        }
    } else {
        isSelectedPiece = false
    }

    // Highlight allowed squares
    let isAllowedSquare = false
    const allowedPositions = allowedMovesForSelectedPiece.map(
        (item) => `${item.col}${item.row}`
    )
    const squarePosition = `${col}${row}`
    if (allowedPositions.includes(squarePosition)) {
        isAllowedSquare = true
    }

    const enableShader = isAllowedSquare || isSelectedPiece

    const handlePawnMove = () => {
        if (allowedPositions.includes(squarePosition)) {
            dispatch(
                movePiece({
                    col,
                    row,
                    name: selectedPiece as pieceName,
                    pieces,
                })
            )
        }
    }

    return (
        <mesh position={position} onClick={handlePawnMove}>
            <boxGeometry
                args={[config.square.size, thickness, config.square.size]}
            />
            <meshStandardMaterial color={color} />
            {enableShader && (
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{ time: { value: 0 } }}
                />
            )}
        </mesh>
    )
}
