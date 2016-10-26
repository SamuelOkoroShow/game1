import React, { Component } from 'react';
import {observer} from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


import Button from './button';

class GameMenu extends Component {
  constructor(){
    super();
    this.startGame = this.startGame.bind(this);
  }

  startGame(){
    this.props.gameManager.startGame();
    this.props.navigator.push({id:"board"})
  }

  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Menu {this.props.gameManager.cardMatrix.rows }</Text>
          <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText} onPress={ this.startGame }>Start Game</Button>
          <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Choose Level</Button>
          <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Settings</Button>
          <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Exit</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    opacity: .8,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#87CEFA',
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#87CEFA',
    margin: 10
  }
});

export default observer(['gameManager'])(GameMenu)
