import React from 'react'
import { config } from '../../config'
import { type props } from './types'

const thickness = 10
export const CheckerSquare: React.FC<props> = ({ position, isDarkSquare }) => {
    const color = isDarkSquare ? '#8B4513' : 'white'

    return (
        <mesh position={position}>
            <boxGeometry
                args={[config.square.size, thickness, config.square.size]}
            />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
