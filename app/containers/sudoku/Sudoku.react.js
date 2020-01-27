/**
 * Samarth sudoku APP
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StatusBar} from 'react-native';

import {generateSudoku, getGameData} from './utils/utils';
import NumberPanel from './components/NumberPanel.react';
import Header from './components/Header.react';
import Board from './components/Board.react';
import Controls from './components/Controls.react';
import type {SudokuFilledDataType, SudokuType} from './SudokuTypes';

type Props = {
  navigation: any,
};

const CACHE = [];

const checkComplete = (filledData, originalData) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (filledData[i][j].value !== originalData[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const cloneArray = arr => {
  return JSON.parse(JSON.stringify(arr));
};

const Sudoku = (props: Props) => {
  const [originalData, setOriginalData] = useState<SudokuType>(
    generateSudoku(),
  );
  const [data, setData] = useState<SudokuFilledDataType>(
    getGameData(originalData, 0),
  );
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [mistakesCount, setMistakesCount] = useState(0);

  useEffect(() => {
    if (checkComplete(data, originalData)) {
      alert('You Won');
    }
  }, [data]);

  useEffect(() => {
    if (mistakesCount > 3) {
      alert('You Lose');
    }
  }, [mistakesCount]);

  const resetGame = () => {
    setMistakesCount(0);
    if (CACHE.length) {
      setData(cloneArray(CACHE[0]));
      CACHE.length = 0;
    }
  };

  const eraseBlock = () => {
    if (activeCell != null) {
      const str = activeCell.split('-');
      const i = parseInt(str[0]);
      const j = parseInt(str[1]);
      const obj = data[i][j];
      if (obj.isEditable) {
        const obj = data[i][j];
        obj.isEdited = true;
        obj.value = null;
        obj.wrongInput = false;
        setData(cloneArray(data));
      }
    }
  };

  const undoMove = () => {
    if (CACHE.length) {
      const lastEle = CACHE.pop();
      setData(cloneArray(lastEle));
    }
  };

  const onTouchBoard = obj => {
    setActiveCell(`${obj.rowIndex}-${obj.columnIndex}`);
  };

  const onTouchNumber = number => {
    if (activeCell != null) {
      const str = activeCell.split('-');
      const i = parseInt(str[0]);
      const j = parseInt(str[1]);
      const obj = data[i][j];
      if (obj.isEditable) {
        CACHE.push(cloneArray(data));
        const obj = data[i][j];
        obj.wrongInput = false;
        if (number !== originalData[i][j]) {
          obj.wrongInput = true;
          setMistakesCount(mistakesCount + 1);
        }
        obj.isEdited = true;
        obj.value = number;
        setData(cloneArray(data));
      }
    }
  };

  const goBack = () => {
    props.navigation.navigate('Home');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Header goBack={goBack} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Board data={data} onTouch={onTouchBoard} activeCell={activeCell} />
            <Controls
              resetGame={resetGame}
              eraseBlock={eraseBlock}
              undoMove={undoMove}
            />
            <NumberPanel onTouchNumber={onTouchNumber} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Sudoku;
