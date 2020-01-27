/**
 * Samarth Sudoku
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import type {LEVEL} from '../sudoku/SudokuTypes';

type Props = {
  onClose: () => void,
  visible: boolean,
  navigation: NavigationScreenProps,
};

const LEVELS: Array<LEVEL> = ['Expert', 'Medium', 'Easy'];

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    // height: 400,
  },
  modalInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButton: {
    marginTop: 30,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 300,
    height: 70,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 3,
    shadowRadius: 8,
    shadowOffset: {width: 1, height: 8},
  },
  gameButtonText: {
    color: '#2980b9',
    fontSize: 45,
  },
});

export default (props: Props) => {
  const {onClose, visible, navigation} = props;

  const onPress = (level: LEVEL) => {
    onClose();
    navigation.navigate('Sudoku', {level});
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <TouchableOpacity onPress={onClose}>
        <Text>Hide Modal</Text>
      </TouchableOpacity>
      <View style={styles.modalInner}>
        {LEVELS.map(level => (
          <TouchableOpacity key={level} onPress={() => onPress(level)}>
            <View style={styles.gameButton}>
              <Text style={styles.gameButtonText}>{level}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};
