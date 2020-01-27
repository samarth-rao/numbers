/**
 * Samarth sudoku APP
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Picker} from 'react-native';
import styles from './styles';
import SudokuGameSelectModel from './SudokuGameSelectModel.react';

const HomeScreen = props => {
  const [sudokuModalVisible, setSudokuModalVisible] = useState(false);
  const closeSudokuModal = () => setSudokuModalVisible(false);
  const onPressSudoku = () => setSudokuModalVisible(true);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SudokuGameSelectModel
        visible={sudokuModalVisible}
        onClose={closeSudokuModal}
        navigation={props.navigation}
      />
      <Text>Play</Text>
      <TouchableOpacity onPress={onPressSudoku}>
        <View style={styles.gameButton}>
          <Text style={styles.gameButtonText}>Sudoku</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
