import {
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
interface HeaderProps {
  children?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  input?: boolean;
}

// if showback null , show default is false

const {height} = Dimensions.get('window');
export default function Header(props: HeaderProps) {
  const {children, right, input} = props;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: scale(SPACING.space_16),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scale(8),
        paddingHorizontal: scale(SPACING.space_12),
      }}>
      <TouchableOpacity style={{flex: 1}} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={scale(24)} color={COLORS.White} />
      </TouchableOpacity>
      <View style={{flex: 6, alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </View>
      {!input && (
        <TouchableOpacity onPress={props.onPress} style={{flex: 1}}>
          {right}
        </TouchableOpacity>
      )}
    </View>
  );
}
