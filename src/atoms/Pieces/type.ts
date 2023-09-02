import { type ThreeEvent } from '@react-three/fiber'
import { type pieceName, type pieceTypes } from '../../store/pieces/types'

export interface PieceProps {
    position: THREE.Vector3
    name: pieceName
    type: pieceTypes
    onClick: (e: ThreeEvent<MouseEvent>) => void
}
