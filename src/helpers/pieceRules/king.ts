import { getAllowedMoves, isWhitePiece, type position } from '..';
import { colNames } from '../../constants/pieces';
import {
  pieceTypeColor,
  type pieceName,
  type PieceState,
  pieceTypes,
} from '../../store/pieces/types';
import { ColName, RowName } from '../../types';
import {
  allEnemies,
  getColArrayIndex,
  getRowArrayIndex,
  isPositionIndexInRange,
  isSquareOccupied,
  isSquareOccupiedByEnemy,
  isSquareOccupiedByFriendly,
  rowNamesInBoardOrder,
} from '../common';

export const getKingMoves = (
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
  const currentPieceType = isWhitePiece(name) ? pieceTypeColor.white : pieceTypeColor.black;
  const enemyPieceType = !isWhitePiece(name) ? pieceTypeColor.white : pieceTypeColor.black;

  const findPieceType = (name: pieceName) => {
    return isWhitePiece(name) ? pieceTypeColor.white : pieceTypeColor.black;
  };

  const enemies = allEnemies(enemyPieceType, pieces).filter(
    (enemy) => enemy.type !== pieceTypes.king && enemy.type !== pieceTypes.pawn
  );
  let underAttackPositions: position[] = [];
  // 8moves

  // +1 row& -1 col
  // +1 row& +1 col

  // -1 row& -1 col
  // -1 row& +1 col

  // +0 row -1 col
  // +0 row +1 col

  // +1 row +0 col
  // -1 row +0 col.
  const getAllPossibleMoves = (isEnemy: boolean) => {
    const enemyKing = allEnemies(enemyPieceType, pieces).find(
      (enemy) => enemy.type === pieceTypes.king
    );
    const kingRow = (isEnemy ? enemyKing?.currentRow : currentRow) as RowName;
    const kingCol = (isEnemy ? enemyKing?.currentCol : currentCol) as ColName;
    const allowedRegularMoves = [
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) + 1],
        col: colNames[colNames.indexOf(kingCol) - 1],
      },
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) + 1],
        col: colNames[colNames.indexOf(kingCol) + 1],
      },
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) - 1],
        col: colNames[colNames.indexOf(kingCol) - 1],
      },
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) - 1],
        col: colNames[colNames.indexOf(kingCol) + 1],
      },
      {
        row: kingRow,
        col: colNames[colNames.indexOf(kingCol) - 1],
      },
      {
        row: kingRow,
        col: colNames[colNames.indexOf(kingCol) + 1],
      },
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) + 1],
        col: kingCol,
      },
      {
        row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(kingRow) - 1],
        col: kingCol,
      },
    ];
    return allowedRegularMoves;
  };

  // For all enemies except pawns and king
  enemies.forEach((enemy) => {
    // assume that the enemy is killed and need to check if that position is under attack or not
    const temporaryPieces: PieceState[] = JSON.parse(JSON.stringify(pieces));
    // check if the position of each pawn is under the radar of king
    const allPiecesUnderRadarOfKing = temporaryPieces.filter((piece) =>
      getAllPossibleMoves(false).find(
        (item) =>
          item.col === piece.currentCol &&
          item.row === piece.currentRow &&
          findPieceType(piece.name) === enemyPieceType
      )
    );
    allPiecesUnderRadarOfKing.forEach((item) => {
      item.kia = true;
    });

    underAttackPositions = [
      ...underAttackPositions,
      ...getAllowedMoves(temporaryPieces, enemy.name).allowedMoves,
    ];
  });

  // For enemy pawns
  const enemyPawns = allEnemies(enemyPieceType, pieces).filter(
    (enemy) => enemy.type === pieceTypes.pawn
  );
  const pawnAttackPositions: Array<{ col: ColName; row: RowName }> = [];
  enemyPawns.forEach((enemyPawn) => {
    // if not out of bound
    if (
      isPositionIndexInRange(getRowArrayIndex(enemyPawn.currentRow)) &&
      isPositionIndexInRange(getColArrayIndex(enemyPawn.currentCol))
    ) {
      if (isWhitePiece(enemyPawn.name)) {
        pawnAttackPositions.push({
          row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(enemyPawn.currentRow) + 1],
          col: colNames[colNames.indexOf(enemyPawn.currentCol) + 1],
        });
        pawnAttackPositions.push({
          row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(enemyPawn.currentRow) + 1],
          col: colNames[colNames.indexOf(enemyPawn.currentCol) - 1],
        });
      } else {
        pawnAttackPositions.push({
          row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(enemyPawn.currentRow) - 1],
          col: colNames[colNames.indexOf(enemyPawn.currentCol) + 1],
        });
        pawnAttackPositions.push({
          row: rowNamesInBoardOrder[rowNamesInBoardOrder.indexOf(enemyPawn.currentRow) - 1],
          col: colNames[colNames.indexOf(enemyPawn.currentCol) - 1],
        });
      }
    }
  });

  // For enemy King
  const enemyKingAttackPositions = getAllPossibleMoves(true);

  // Aggregate moves
  underAttackPositions = [
    ...underAttackPositions,
    ...pawnAttackPositions,
    ...enemyKingAttackPositions,
  ];

  // push to allowed moves if king can be moved there
  getAllPossibleMoves(false).forEach((move) => {
    // If friendlies are present in the place, cannot move king there
    if (!isSquareOccupiedByFriendly(move.col, move.row, pieces, currentPieceType)) {
      // If enemy is occupying the position king can kill them
      // only if the enemy is not backed by another enemy pawn
      if (isSquareOccupiedByEnemy(move.col, move.row, pieces, enemyPieceType)) {
        // check if this square is in the FOV of an enemy
        if (
          underAttackPositions.find(
            (position) => position.col === move.col && position.row === move.row
          ) === undefined
        ) {
          allowedMoves.push({ col: move.col, row: move.row });
          attackablePositionOccupiedByEnemy.push({
            col: move.col,
            row: move.row,
          });
        }
      } else {
        // This means the square is empty
        // check if this empty square is in the FOV of an enemy
        if (
          underAttackPositions.find(
            (position) => position.col === move.col && position.row === move.row
          ) === undefined
        ) {
          allowedMoves.push({ col: move.col, row: move.row });
        }
      }
    }
  });

  const getCastlingMoves = () => {
    const castlingMoves = [];

    const kingState = pieces.find((piece) => piece.name === name);
    const currentRow = isWhitePiece(name) ? RowName.one : RowName.eight;

    // Function to check if the path between king and rook is clear
    const isPathClear = (isKingside: boolean) => {
      // Set the rook's row and column based on the castling type
      const isWhite = isWhitePiece(name);
      let rookRow, rookCol;
      if (isWhite && isKingside) {
        rookRow = RowName.one;
        rookCol = ColName.H; // White kingside castling (Rook on H1)
      } else if (isWhite && !isKingside) {
        rookRow = RowName.one;
        rookCol = ColName.A; // White queenside castling (Rook on A1)
      } else if (!isWhite && isKingside) {
        rookRow = RowName.eight;
        rookCol = ColName.H; // Black kingside castling (Rook on H8)
      } else {
        rookRow = RowName.eight;
        rookCol = ColName.A; // Black queenside castling (Rook on A8)
      }

      // Determine the direction for iteration: -1 for queenside, 1 for kingside
      const direction = isKingside ? 1 : -1;
      const startColIndex = getColArrayIndex(currentCol);
      const endColIndex = getColArrayIndex(rookCol);

      // Iterate from the square next to the king to the square before the rook
      for (let i = startColIndex + direction; i !== endColIndex; i += direction) {
        const col = colNames[i];
        if (isSquareOccupied(col, rookRow, pieces)) {
          return false; // Path is not clear
        }
      }
      return true; // Path is clear
    };

    // Function to check if a square is under attack
    const isSquareUnderAttack = (col: ColName, row: RowName) => {
      return underAttackPositions.some((position) => position.col === col && position.row === row);
    };

    // Check for kingside castling
    if (kingState?.isCastlingAllowed?.short && isPathClear(true)) {
      // Check the square G1 is not under attack and the king is not in check
      if (
        !isSquareUnderAttack(ColName.G, currentRow) &&
        !isSquareUnderAttack(currentCol, currentRow)
      ) {
        castlingMoves.push({
          row: currentRow,
          col: ColName.G, // Kingside castling
        });
      }
    }

    // Check for queenside castling
    if (kingState?.isCastlingAllowed?.long && isPathClear(false)) {
      // Check the square C1 is not under attack and the king is not in check
      if (
        !isSquareUnderAttack(ColName.C, currentRow) &&
        !isSquareUnderAttack(currentCol, currentRow)
      ) {
        castlingMoves.push({
          row: currentRow,
          col: ColName.C, // Queenside castling
        });
      }
    }
    return castlingMoves;
  };
  allowedMoves = [...allowedMoves, ...getCastlingMoves()];
  return { allowedMoves, attackablePositionOccupiedByEnemy };
};
