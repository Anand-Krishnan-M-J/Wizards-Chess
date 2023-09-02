import { type pieceName } from '../store/pieces/types'

export const isWhitePiece = (name: pieceName) => name.split('_')[1] === 'W'
