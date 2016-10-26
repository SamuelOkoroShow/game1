/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BackgroundScreen from './widgets/background';
import {observer} from 'mobx-react/native';

class Board extends Component {
  render() {
    const { cardMatrix: { rows, columns }, levelCount } = this.props.gameManager;
    return (
      <BackgroundScreen style={styles.container}>
        <Text style={styles.welcome}>
          {` Welcome to Level ${levelCount} `}
        </Text>
        <Text style={styles.instructions}>
          { `rows: ${rows}`}
        </Text>
        <Text style={styles.instructions}>
          { `columns: ${columns}`}
        </Text>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default observer(['gameManager'])(Board)

