/**
 * Sudoku Samarth
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';
import type {SudokuFilledCellObjectType} from '../SudokuTypes';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  active: {
    backgroundColor: '#ecf0f1',
  },
  borderRL: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  borderBL: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  borderBD: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  borderLD: {
    borderLeftWidth: 1,
    borderLeftColor: '#000',
  },
  borderTD: {
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  borderRD: {
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  boardNumber: {
    fontSize: 28,
  },
  wrongInput: {
    color: '#c0392b',
  },
  editable: {
    color: '#2980b9',
  },
});

const getCellStyle = (
  obj: SudokuFilledCellObjectType,
  activeCell: string | null,
) => {
  let styleArr = [styles.col];
  const {columnIndex, rowIndex, wrongInput} = obj;
  if (columnIndex === 0) {
    styleArr.push(styles.borderLD, styles.borderRL);
  } else if (columnIndex === 2 || columnIndex === 5 || columnIndex === 8) {
    styleArr.push(styles.borderRD);
  } else {
    styleArr.push(styles.borderRL);
  }
  if (rowIndex !== 2 && rowIndex !== 5 && rowIndex !== 8) {
    styleArr.push(styles.borderBL);
  }
  if (activeCell && activeCell === `${rowIndex}-${columnIndex}`) {
    styleArr.push(styles.active);
  }
  return styleArr;
};

const getRowStyle = (rowIndex: number) => {
  const stylesArr = [styles.row];
  if (rowIndex === 0) {
    stylesArr.push(styles.borderTD);
  } else if (rowIndex === 2 || rowIndex === 5 || rowIndex === 8) {
    stylesArr.push(styles.borderBD);
  }
  return stylesArr;
};

const getBoardNumberStyle = (data: SudokuFilledCellObjectType) => {
  const styleArr = [styles.boardNumber];
  if (data.wrongInput) {
    styleArr.push(styles.wrongInput);
  } else if (data.isEditable) {
    styleArr.push(styles.editable);
  }
  return styleArr;
};

export {getCellStyle, getRowStyle, getBoardNumberStyle};
