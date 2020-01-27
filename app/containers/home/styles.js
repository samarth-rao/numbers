/**
 * Samarth Sudoku
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  gameButton: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 300,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  gameButtonText: {
    color: '#2980b9',
    fontSize: 45,
  },
});

export default styles;
