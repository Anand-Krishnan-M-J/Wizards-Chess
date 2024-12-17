import { type Vector3 } from 'three';
import { pieceName } from '../store/pieces/types';

export const GetPieceProperties = (
  name: pieceName
): {
  position: Vector3 | undefined;
  roughness: number;
  metalness: number;
} => {
  switch (name) {
    // Pawns
    case pieceName.Pawn2A_W:
    case pieceName.Pawn2B_W:
    case pieceName.Pawn2C_W:
    case pieceName.Pawn2D_W:
    case pieceName.Pawn2E_W:
    case pieceName.Pawn2F_W:
    case pieceName.Pawn2G_W:
    case pieceName.Pawn2H_W:
      return {
        position: [-58.618, 2.147, -1.07] as unknown as Vector3,
        roughness: 0.5,
        metalness: 0.5,
      };
    case pieceName.Pawn7A_B:
    case pieceName.Pawn7B_B:
    case pieceName.Pawn7C_B:
    case pieceName.Pawn7D_B:
    case pieceName.Pawn7E_B:
    case pieceName.Pawn7F_B:
    case pieceName.Pawn7G_B:
    case pieceName.Pawn7H_B:
      return {
        position: [-57.829, 5, -1.162] as unknown as Vector3,
        roughness: 0.7,
        metalness: 0.7,
      };
    // King
    case pieceName.King_W:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.5,
        metalness: 0.5,
      };
    case pieceName.King_B:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.7,
        metalness: 0.4,
      };
    // Queen
    case pieceName.Queen_W:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.5,
        metalness: 0.5,
      };
    case pieceName.Queen_B:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.7,
        metalness: 0.4,
      };
    // Rook
    case pieceName.Rook1A_W:
    case pieceName.Rook1H_W:
      return {
        position: undefined,
        roughness: 0.5,
        metalness: 0.5,
      };

    case pieceName.Rook8A_B:
    case pieceName.Rook8H_B:
      return {
        position: undefined,
        roughness: 0.7,
        metalness: 0.3,
      };
    // Bishop
    case pieceName.Bishop1C_W:
    case pieceName.Bishop1F_W:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.5,
        metalness: 0.5,
      };
    case pieceName.Bishop8C_B:
    case pieceName.Bishop8F_B:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.7,
        metalness: 0.1,
      };
    // Knight
    case pieceName.Knight1B_W:
    case pieceName.Knight1G_W:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.5,
        metalness: 0.5,
      };

    case pieceName.Knight8B_B:
    case pieceName.Knight8G_B:
      return {
        position: [0, 5, 0] as unknown as Vector3,
        roughness: 0.7,
        metalness: 0.6,
      };
  }
};
