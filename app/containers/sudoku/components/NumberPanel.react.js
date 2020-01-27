/**
 * Sudoku Samarth
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  onTouchNumber: (n: number) => void,
};

const styles = StyleSheet.create({
  inputPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    marginTop: 10,
  },
  inputView: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNum: {
    color: '#2980b9',
    fontSize: 35,
  },
});

export default (props: Props) => {
  const {onTouchNumber} = props;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.inputPanel}>
      {arr.map(n => (
        <TouchableOpacity key={n} onPress={() => onTouchNumber(n)}>
          <View style={styles.inputView} key={n}>
            <Text style={styles.inputNum}>{n}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
