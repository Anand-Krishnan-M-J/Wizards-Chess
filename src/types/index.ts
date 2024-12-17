export enum RowName {
  eight = '8',
  seven = '7',
  six = '6',
  five = '5',
  four = '4',
  three = '3',
  two = '2',
  one = '1',
}
export enum ColName {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
}
export const rowNamesForSquare = ['8', '7', '6', '5', '4', '3', '2', '1'];
export const colnames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const rowNames = [...rowNamesForSquare].reverse();
