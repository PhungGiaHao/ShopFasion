import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../theme/theme';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {storage} from '../../storage/Storage';

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    if (storage.getBoolean('isLogin')) {
      setTimeout(() => {
        navigation.replace('MainTab');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace('SignIn');
      }, 2000);
    }
    return () => {};
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
      }}>
      <Image
        source={require('../../assets/images/owl.png')}
        resizeMode="contain"
        style={{
          width: scale(120),
          height: scale(120),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
