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
import Card from './widgets/card';

import {observer} from 'mobx-react/native';

class Board extends Component {

  componentDidMount(){
    this.props.gameManager.generateCards()
  }

  render() {
    const { levelCount, cardMatrix } = this.props.gameManager;
    return (
      <BackgroundScreen style={styles.container}>
        <Text style={styles.welcome}>
          {` Welcome to Level ${levelCount} `}
        </Text>
        <View>
          { cardMatrix.map(row => row.map(column => <Text>{ column }</Text>))}
        </View>
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

