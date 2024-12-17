import { type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { type pieceName, type pieceTypes } from '../../store/pieces/types';
import { type ColName, type RowName } from '../../types';

export interface PieceProps {
  position: THREE.Vector3;
  name: pieceName;
  type: pieceTypes;
  col: ColName;
  row: RowName;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}
