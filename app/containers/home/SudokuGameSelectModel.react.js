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

type Props = {
  onClose: () => void,
  visible: boolean,
  navigation: any,
};

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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    // flex: 1,
    top: 200,
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2c3e50',
  },
});

const Item = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default (props: Props) => {
  const {onClose, visible, navigation} = props;
  const DATA = ['Expert', 'Moderate', 'Easy'];

  const onPress = a => {
    navigation.navigate('Sudoku');
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item} onPress={onPress} />}
          />
          <TouchableOpacity onPress={onClose}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
