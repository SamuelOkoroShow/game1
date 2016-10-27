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
  ScrollView,
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
        <ScrollView horizontal={true} style={{flex:1}} contentContainerStyle={{flex:1, flexDirection:"row", flexWrap:'wrap'}}>
          { cardMatrix.map(row => row.filter(cell => cell.id).map(cellData => <Card {...this.props } cardData={cellData} />))}
        </ScrollView>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


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

