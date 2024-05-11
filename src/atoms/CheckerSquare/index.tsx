import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { updateGameStateFirebaseRequest } from '@/store/firebase'
import { usePieceColorFromSessionStorage } from '@/hooks/useIsBlackPiece'
import { getPieceType } from '@/helpers'
import { type RootState } from '../../store/types'
import { type pieceName, type PieceState } from '../../store/pieces/types'
import { config } from '../../config'
import { movePiece } from '../../store/pieces'
import { type props } from './types'
import { vertexShader, fragmentShader } from './shader'

const thickness = 10

export const CheckerSquare: React.FC<props> = ({
    position,
    isDarkSquare,
    col,
    row,
}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const color = isDarkSquare ? '#8B4513' : 'white'
    const { selectedPiece, pieces, allowedMovesForSelectedPiece } = useSelector(
        (state: RootState) => state.pieces
    )
    const state = useSelector((state: RootState) => state)

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
    const { playerPieceType } = usePieceColorFromSessionStorage();
    const selectedPieceType = selectedPiece&&getPieceType(selectedPiece as pieceName);

    const handlePieceMove = () => {
        if (allowedPositions.includes(squarePosition) &&
            (playerPieceType === selectedPieceType||!router.query.gameId)) {
            dispatch(
                movePiece({
                    col,
                    row,
                    name: selectedPiece as pieceName,
                    pieces,
                })
            )
            dispatch(updateGameStateFirebaseRequest({ gameState: state.pieces }))
        }
    }

    return (
        <mesh position={position} onClick={handlePieceMove}>
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
