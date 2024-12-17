import { type Vector3 } from 'three';
import { type ColName, type RowName } from '../../types';

export interface props {
  position: Vector3;
  isDarkSquare: boolean;
  col: ColName;
  row: RowName;
}
