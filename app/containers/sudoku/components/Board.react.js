/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import {
  getCellStyle,
  getRowStyle,
  getBoardNumberStyle,
} from '../utils/styleUtils';
import type {
  SudokuFilledDataType,
  SudokuType,
  SudokuFilledCellObjectType,
} from '../SudokuTypes';

type Props = {
  data: SudokuFilledDataType,
  onTouch: (obj: SudokuFilledCellObjectType) => void,
  activeCell: string | null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const CellInner = props => {
  const {data} = props;
  const {value} = data;
  const styleArr = getBoardNumberStyle(data);
  return value !== 0 ? <Text style={styleArr}>{value}</Text> : null;
};

const Cell = props => {
  const {data, setActive, activeCell} = props;
  const styleArr = getCellStyle(data, activeCell);
  return (
    <TouchableHighlight onPress={() => setActive(data)} underlayColor="white">
      <View style={styleArr}>
        <CellInner data={data} />
      </View>
    </TouchableHighlight>
  );
};

const Row = props => {
  const {rows, rowIndex, setActive, activeCell} = props;
  const stylesArr = getRowStyle(rowIndex);
  return (
    <View style={stylesArr}>
      {rows.map((data, index) => (
        <Cell
          data={data}
          key={`${rowIndex}--${index}`}
          columnIndex={index}
          rowIndex={rowIndex}
          setActive={setActive}
          activeCell={activeCell}
        />
      ))}
    </View>
  );
};

export default (props: Props) => {
  const {data, onTouch, activeCell} = props;
  return (
    <View style={styles.container}>
      {data.map((rows, rowIndex) => (
        <Row
          rows={rows}
          rowIndex={rowIndex}
          setActive={onTouch}
          activeCell={activeCell}
          key={`${rowIndex}-1row`}
        />
      ))}
    </View>
  );
};
