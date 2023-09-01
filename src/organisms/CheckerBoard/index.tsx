import React from 'react'
import { type Vector3 } from 'three'
import { CheckerSquare } from '../../atoms/CheckerSquare'
import { config } from '../../config'

export const CheckerBoard: React.FC = () => (
    <group>
        {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => {
                const isDarkSquare = (row + col) % 2 === 1
                const x = col * config.square.size - config.square.xOffset
                const z = row * config.square.size - config.square.yOffset
                return (
                    <CheckerSquare
                        key={`square-${row}-${col}`}
                        position={[x, 0, z] as unknown as Vector3}
                        isDarkSquare={isDarkSquare}
                    />
                )
            })
        )}
    </group>
)
