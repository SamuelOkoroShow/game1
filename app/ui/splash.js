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
  View,
  Image
} from 'react-native';

import BackgroundScreen from './widgets/background';
export default class Splash extends Component {

  componentDidMount(){
    setTimeout( () => this.props.navigator.replace({id:"home"}), 2000);
  }

  render() {
    return (
      <BackgroundScreen>
          <Text style={styles.welcome}>Old Macdonald Had a Farm</Text>
          <Text style={styles.instructions}>card swiping game</Text>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    opacity: .8,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

