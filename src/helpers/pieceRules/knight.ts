import { isWhitePiece } from '..';
import { colNames } from '../../constants/pieces';
import { pieceTypeColor, type pieceName, type PieceState } from '../../store/pieces/types';
import { type ColName, type RowName } from '../../types';
import {
  getColArrayIndex,
  getRowArrayIndex,
  isPositionIndexInRange,
  isSquareOccupied,
  isSquareOccupiedByEnemy,
  isSquareOccupiedByKing,
  rowNamesInBoardOrder,
} from '../common';

export const getKnightMoves = (
  name: pieceName,
  currentCol: ColName,
  currentRow: RowName,
  pieces: PieceState[]
) => {
  let allowedMoves: Array<{ col: ColName; row: RowName }> = [];
  const attackablePositionOccupiedByEnemy: Array<{
    col: ColName;
    row: RowName;
  }> = [];
  // 8moves

  // +2 row& -1 col
  // +2 row& +1 col

  // -2 row& -1 col
  // -2 row& +1 col

  // +1 row -2 col
  // +1 row +2 col

  // -1 row -2 col
  // -1 row +2 col
  const allPossibleMoves = [
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) + 2],
      col: colNames[colNames.indexOf(currentCol) - 1],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) + 2],
      col: colNames[colNames.indexOf(currentCol) + 1],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) - 2],
      col: colNames[colNames.indexOf(currentCol) - 1],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) - 2],
      col: colNames[colNames.indexOf(currentCol) + 1],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) + 1],
      col: colNames[colNames.indexOf(currentCol) - 2],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) + 1],
      col: colNames[colNames.indexOf(currentCol) + 2],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) - 1],
      col: colNames[colNames.indexOf(currentCol) - 2],
    },
    {
      row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(currentRow) - 1],
      col: colNames[colNames.indexOf(currentCol) + 2],
    },
  ];

  allPossibleMoves.forEach((move) => {
    // If either row or col is out of bound
    if (
      !(
        isPositionIndexInRange(getRowArrayIndex(move.row)) &&
        isPositionIndexInRange(getColArrayIndex(move.col))
      )
    ) {
      return;
    }

    // Skip if the position is occupied by the king
    if (isSquareOccupiedByKing(move.col, move.row, pieces)) {
      return; // Ignore this move
    }

    // The new position must be empty or occupied by an enemy to be movable
    if (
      isSquareOccupiedByEnemy(
        move.col,
        move.row,
        pieces,
        isWhitePiece(name) ? pieceTypeColor.black : pieceTypeColor.white
      )
    ) {
      attackablePositionOccupiedByEnemy.push({
        col: move.col,
        row: move.row,
      });
    }

    // If not occupied by friendlies it can be movable
    if (!isSquareOccupied(move.col, move.row, pieces)) {
      allowedMoves.push({ col: move.col, row: move.row });
    }
  });

  // Attackable positions are also allowed moves
  allowedMoves = [...allowedMoves, ...attackablePositionOccupiedByEnemy];

  return { allowedMoves, attackablePositionOccupiedByEnemy };
};
