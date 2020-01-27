/**
 * Samarth sudoku APP
 * @format
 * @flow
 */

export type SudokuFilledCellObjectType = {
  isEdited?: boolean,
  isEditable: boolean,
  isActive?: boolean,
  value: number | null,
  wrongInput?: boolean,
  rowIndex: number,
  columnIndex: number,
};

export type SudokuFilledRowDataType = Array<SudokuFilledCellObjectType>;

export type SudokuFilledDataType = Array<SudokuFilledRowDataType>;

export type SudokuType = Array<Array<number>>;
