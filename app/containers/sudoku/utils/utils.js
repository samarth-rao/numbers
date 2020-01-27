/**
 * Samarth sudoku APP
 * @format
 * @flow
 */

import type {
  SudokuFilledDataType,
  SudokuType,
  SudokuFilledRowDataType,
  SudokuFilledCellObjectType,
} from '../SudokuTypes';

const createArray = () => {
  const sudoku = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!sudoku[i]) {
        sudoku.push([]);
      }
      sudoku[i][j] = 0;
    }
  }
  return sudoku;
};

const getRandomNumberArr = () => {
  const arr = [];
  for (let i = 0; i < 9; ++i) {
    arr[i] = i + 1;
  }
  var tmp,
    current,
    top = arr.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = arr[current];
      arr[current] = arr[top];
      arr[top] = tmp;
    }
  return arr;
};

const fillDiagonalBlock = (sudoku: SudokuType, _bi: number) => {
  const arr = getRandomNumberArr();
  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sudoku[i + _bi][j + _bi] = arr[k];
      k++;
    }
  }
};

const fillDiagonalBlocks = (sudoku: SudokuType) => {
  for (let i = 0; i < 3; i++) {
    fillDiagonalBlock(sudoku, i * 3);
  }
};

const isUsedInRow = (sudoku: SudokuType, rowIndex: number, num: number) => {
  for (let i = 0; i < 9; i++) {
    const n = sudoku[rowIndex][i];
    if (n !== 0 && n === num) {
      return true;
    }
  }
  return false;
};

const isUsedInCol = (sudoku: SudokuType, columnIndex: number, num: number) => {
  for (let i = 0; i < 9; i++) {
    const n: number = sudoku[i][columnIndex];
    if (n !== 0 && n === num) {
      return true;
    }
  }
  return false;
};

const isUsedInBlock = (
  sudoku: SudokuType,
  rowIndex: number,
  columnIndex: number,
  num: number,
) => {
  const startRow = rowIndex - (rowIndex % 3);
  const startCol = columnIndex - (columnIndex % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      const n = sudoku[i][j];
      if (n !== 0 && n === num) {
        return true;
      }
    }
  }
  return false;
};

const isSafeNum = (
  sudoku: SudokuType,
  rowIndex: number,
  columnIndex: number,
  num: number,
) => {
  return (
    !isUsedInBlock(sudoku, rowIndex, columnIndex, num) &&
    !isUsedInRow(sudoku, rowIndex, num) &&
    !isUsedInCol(sudoku, columnIndex, num)
  );
};

let counter = 0;

const fillRemainingBlock = (sudoku, i, j) => {
  counter++;
  if (j >= 9 && i < 8) {
    i = i + 1;
    j = 0;
  }
  if (i >= 9 && j >= 9) {
    return true;
  }
  if (i < 3) {
    if (j < 3) {
      j = 3;
    }
  } else if (i < 6) {
    if (j === 3) {
      j = j + 3;
    }
  } else if (j === 6) {
    i = i + 1;
    j = 0;
    if (i >= 9) {
      return true;
    }
  }
  for (let num = 1; num <= 9; num++) {
    if (isSafeNum(sudoku, i, j, num)) {
      sudoku[i][j] = num;
      if (fillRemainingBlock(sudoku, i, j + 1)) {
        return true;
      }
      sudoku[i][j] = 0;
    }
  }
  return false;
};

const generateSudoku = () => {
  const sudoku = createArray();
  fillDiagonalBlocks(sudoku);
  fillRemainingBlock(sudoku, 0, 3);
  return sudoku;
};

const randomGenerator = (num: number): number => {
  return Math.floor(Math.random() * num);
};

const getEliminateRandomArray = (sudoku, c) => {
  const cloneSudoku = JSON.parse(JSON.stringify(sudoku));
  let count = c;
  while (count != 0) {
    const i = randomGenerator(9);
    const j = randomGenerator(9);
    if (cloneSudoku[i][j] != 0) {
      count--;
      cloneSudoku[i][j] = 0;
    }
  }
  return cloneSudoku;
};

const generateGameData = (arr: SudokuType): SudokuFilledDataType => {
  const gameData: SudokuFilledDataType = [];
  for (let i = 0; i < arr.length; i++) {
    const objArray: SudokuFilledRowDataType = [];
    for (let j = 0; j < arr.length; j++) {
      const value = arr[i][j];
      const obj: SudokuFilledCellObjectType = {
        value,
        isEditable: value === 0,
        rowIndex: i,
        columnIndex: j,
      };
      objArray.push(obj);
    }
    gameData.push(objArray);
  }
  return gameData;
};

const getGameData = (
  sudoku: SudokuType,
  level: number,
): SudokuFilledDataType => {
  const arr = getEliminateRandomArray(sudoku, level);
  return generateGameData(arr);
};

export {generateSudoku, getGameData};
