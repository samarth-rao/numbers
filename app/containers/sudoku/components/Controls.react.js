/**
 * Sudoku Samarth
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

type Props = {
  resetGame: () => void,
  eraseBlock: () => void,
  undoMove: () => void,
};

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  control: {},
});

export default (props: Props) => {
  const {resetGame, eraseBlock, undoMove} = props;
  return (
    <View style={styles.controls}>
      <View style={styles.control}>
        <Icon
          raised
          name="home"
          type="font-awesome"
          color="#f50"
          onPress={resetGame}
        />
      </View>
      <View style={styles.control}>
        <Icon
          raised
          name="home"
          type="font-awesome"
          color="#f50"
          onPress={eraseBlock}
        />
      </View>
      <View style={styles.control}>
        <Icon
          raised
          name="home"
          type="font-awesome"
          color="#f50"
          onPress={undoMove}
        />
      </View>
    </View>
  );
};
