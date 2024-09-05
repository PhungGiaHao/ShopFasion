import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import Header from '../../components/AppHeader';
import CustomText from '../../components/CustomText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {s, scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usePayment} from '../../Context/PayMentContext';
import {FlatList} from 'react-native-gesture-handler';
import ModalWarning from './ModalWarning';
import { IPayment } from '../../interface/payment';

export default function Payment() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {payment} = usePayment();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<IPayment | null>(null);
  const formatCode = (code: string) => {
    return code
      .replace(/\d{4}(?= \d{4})/g, '****')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
  };
  const showWarning = (item:IPayment) => {
    setSelected(item);
    setIsModalVisible(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        children={
          <CustomText style={{fontSize: 20, color: COLORS.White}}>
            Payment Method
          </CustomText>
        }
        right={
          <Ionicons
            name="add-circle-outline"
            size={scale(24)}
            color={COLORS.White}
          />
        }
        onPress={() => navigation.navigate('AddPayment')}
      />
      <View
        style={{
          flex: 1,
          paddingTop: scale(SPACING.space_32),
          paddingHorizontal: scale(SPACING.space_28),
        }}>
        <FlatList
          data={payment}
          renderItem={({item}) => (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: scale(SPACING.space_16),
                borderRadius: scale(BORDERRADIUS.radius_10),
                backgroundColor: 'background: rgba(255, 255, 255, 0.08)',
                marginBottom: scale(SPACING.space_16),
              }}>
              <View
                style={{
                  gap: scale(SPACING.space_8),
                }}>
                <CustomText
                  style={{
                    fontSize: scale(FONTSIZE.size_16),
                    fontFamily: FONTFAMILY.KoHo_Bold,
                    color: COLORS.White,
                  }}>
                  {formatCode(item.code)}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: scale(FONTSIZE.size_14),
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                  {item.licenseDate}
                </CustomText>
              </View>
              <Ionicons
                name="trash-outline"
                size={scale(24)}
                color={COLORS.White}
                onPress={() => showWarning(item)}
              />
            </View>
          )}
          keyExtractor={item => item.code}
        />
      </View>
      <ModalWarning
        isModalVisible={isModalVisible}
        selected={selected}
        onCloseModal={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
