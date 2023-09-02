import React from 'react'
import { type Vector3 } from 'three'
import { CheckerSquare } from '../../atoms/CheckerSquare'
import { config } from '../../config'
import { colNames } from '../../constants/pieces'
import { type RowName, rowNames } from '../../types'

export const CheckerBoard: React.FC = () => (
    <group>
        {rowNames.map((rowName, row) =>
            colNames.map((colName, col) => {
                const isDarkSquare = (row + col) % 2 === 1
                const x = col * config.square.size - config.square.xOffset
                const z = row * config.square.size - config.square.yOffset
                return (
                    <CheckerSquare
                        key={`square-${row}-${col}`}
                        position={[x, 0, z] as unknown as Vector3}
                        isDarkSquare={isDarkSquare}
                        col={colName}
                        row={rowName as RowName}
                    />
                )
            })
        )}
    </group>
)
