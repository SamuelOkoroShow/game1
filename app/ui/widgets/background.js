import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import styles from '../../styles/shared';

export default function BackgroundScreen({ children }){
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/imgs/background.jpg')} style={[styles.backgroundImage, styles.container]} >
        { children }
      </Image>
    </View>
  );
}
