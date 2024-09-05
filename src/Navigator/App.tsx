import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './MainNavigator';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../Config/ToastConfig';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StatusBar />
      <MainStackNavigator />
      {/* 
      // @ts-ignore */}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
