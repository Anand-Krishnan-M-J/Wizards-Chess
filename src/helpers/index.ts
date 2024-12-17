import { type PieceState, pieceTypes, type pieceName, pieceTypeColor } from '../store/pieces/types';
import { type ColName, type RowName } from '../types';
import { getBishopMoves } from './pieceRules/bishop';
import { getKingMoves } from './pieceRules/king';
import { getKnightMoves } from './pieceRules/knight';
import { getPawnMoves } from './pieceRules/pawn';
import { getQueenMoves } from './pieceRules/queen';
import { getRookMoves } from './pieceRules/rook';

export const isWhitePiece = (name: pieceName) => name.split('_')[1] === 'W';
export const getPieceType = (name: pieceName) =>
  isWhitePiece(name) ? pieceTypeColor.white : pieceTypeColor.black;
export interface position {
  col: ColName;
  row: RowName;
}
export const getAllowedMoves = (
  pieces: PieceState[],
  name: pieceName
): {
  allowedMoves: position[];
  attackablePositionOccupiedByEnemy: position[];
} => {
  const selectedPiece = pieces.find((piece) => piece.name === name);
  const { currentCol, currentRow, type } = selectedPiece as PieceState;
  if (type === pieceTypes.pawn) {
    return getPawnMoves(name, currentCol, currentRow, pieces);
  } else if (type === pieceTypes.rook) {
    return getRookMoves(name, currentCol, currentRow, pieces);
  } else if (type === pieceTypes.knight) {
    return getKnightMoves(name, currentCol, currentRow, pieces);
  } else if (type === pieceTypes.bishop) {
    return getBishopMoves(name, currentCol, currentRow, pieces);
  } else if (type === pieceTypes.queen) {
    return getQueenMoves(name, currentCol, currentRow, pieces);
  } else if (type === pieceTypes.king) {
    return getKingMoves(name, currentCol, currentRow, pieces);
  }
  return { allowedMoves: [], attackablePositionOccupiedByEnemy: [] };
};
