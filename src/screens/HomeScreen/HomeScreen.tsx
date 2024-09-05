import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTFAMILY, SPACING} from '../../theme/theme';
import CustomText from '../../components/CustomText';
import {scale} from 'react-native-size-matters';
import Category from './Category';
import Product from './Product';

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={{flex: 1, paddingHorizontal: scale(SPACING.space_32)}}>
        <CustomText
          style={{
            fontSize: scale(46),
            fontFamily: FONTFAMILY.KoHo_Bold,
          }}>
          Cloths
        </CustomText>
        <CustomText
          style={{
            fontSize: scale(46),
          }}>
          Collection
        </CustomText>
        <Category />
        <Product />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: COLORS.Black,
  },
});
