/**
 * Sudoku Samarth
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    color: '#2980b9',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    width: 400,
    height: 60,
    paddingTop: 10,
  },
  headerHomeText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 300,
  },
  headerHomeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    fontSize: 30,
  },
});

export default props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerHomeText}>
        <Text style={styles.headerText}>Sudoku</Text>
      </View>
      <View style={styles.headerHomeIcon}>
        <Icon
          raised
          name="home"
          type="font-awesome"
          color="#f50"
          onPress={props.goBack}
        />
      </View>
    </View>
  );
};
