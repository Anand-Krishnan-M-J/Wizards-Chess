import { type Vector3 } from 'three'
import { config, offset } from '../../config'
import { colNames, rowNames } from '../../constants/pieces'
import { type ColName, type RowName } from '../../types'

export const getCordinates = (row: RowName, col: ColName): Vector3 => {
    // row and column index from 1 to 8
    const rowIndex = rowNames.indexOf(row)
    const colindex = colNames.indexOf(col)
    const xPosition = config.square.size * colindex - offset
    const zPosition = config.square.size * rowIndex - offset
    return [xPosition, 0, zPosition] as unknown as Vector3
}
