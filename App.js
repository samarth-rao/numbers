/**
 * Samarth Sudoku
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './app/containers/home/Home.react';
import Sudoku from './app/containers/sudoku/Sudoku.react';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Sudoku: {screen: Sudoku},
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(MainNavigator);

export default App;
