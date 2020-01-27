/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

const fillDiagonalBlock = (sudoku, _bi) => {
  const arr = getRandomNumberArr();
  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sudoku[i + _bi][j + _bi] = arr[k];
      k++;
    }
  }
};

const fillDiagonalBlocks = sudoku => {
  for (let i = 0; i < 3; i++) {
    fillDiagonalBlock(sudoku, i * 3);
  }
};

const isUsedInRow = (sudoku, rowIndex, num) => {
  for (let i = 0; i < 9; i++) {
    const n = sudoku[rowIndex][i];
    if (n && n === num) {
      return true;
    }
  }
  return false;
};

const isUsedInCol = (sudoku, columnIndex, num) => {
  for (let i = 0; i < 9; i++) {
    const n = sudoku[i][columnIndex];
    if (n && n === num) {
      return true;
    }
  }
  return false;
};

const isUsedInBlock = (sudoku, rowIndex, columnIndex, num) => {
  const startRow = rowIndex - (rowIndex % 3);
  const startCol = columnIndex - (columnIndex % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      const n = sudoku[i][j];
      if (n && n === num) {
        return true;
      }
    }
  }
  return false;
};

const isSafeNum = (sudoku, rowIndex, columnIndex, num) => {
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
        console.log(i, j);
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
  console.log(counter);
  return sudoku;
};

const randomGenerator = num => {
  return Math.floor(Math.random() * num + 1);
};

const getEliminateRandomArray = (sudoku, c) => {
  const cloneSudoku = JSON.parse(JSON.stringify(sudoku));
  let count = c;
  while (count != 0) {
    const cellId = randomGenerator(81);
    let i = parseInt(cellId / 9);
    let j = cellId % 9;
    if (j != 0) {
      j = j - 1;
    }
    if (i > 8) {
      i = i - 1;
    }
    if (cloneSudoku[i][j] != 0) {
      count--;
      cloneSudoku[i][j] = 0;
    }
  }
  return cloneSudoku;
};

const generateGameData = arr => {
  const gameData = [];
  for (let i = 0; i < arr.length; i++) {
    const objArray = [];
    for (let j = 0; j < arr.length; j++) {
      const value = arr[i][j];
      const obj = {
        value,
        isEditable: value === 0,
        isActive: false,
        rowIndex: i,
        columnIndex: j,
      };
      objArray.push(obj);
    }
    gameData.push(objArray);
  }
  return gameData;
};

const getGameData = (sudoku, level) => {
  const arr = getEliminateRandomArray(sudoku, level);
  return generateGameData(arr);
};

export {generateSudoku, getGameData};
