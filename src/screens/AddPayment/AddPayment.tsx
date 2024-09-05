import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../components/CustomText';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import Header from '../../components/AppHeader';
import CustomTextInput from '../../components/CustomInput';
import {useForm, useWatch} from 'react-hook-form';
import {s, scale} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import {usePayment} from '../../Context/PayMentContext';
import ModalSuccess from './ModalSuccess';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
type FormValues = {
  code: string;
  licenseDate: string;
  cvv: string;
};
export default function AddPayment() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      code: '',
      licenseDate: '',
      cvv: '',
    },
    mode: 'onSubmit',
  });
  const {addPayment} = usePayment();
  const onSubmit = (data: FormValues) => {
    const payment = {
      ...data,
      code: data.code.trim().replace(/\s?/g, ''),
    };
    addPayment(payment);
    setIsVisible(true);
  };
  const onCloseModal = () => {
    setIsVisible(false);
    navigation.goBack();
  };
  const [formattedCode, setFormattedCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const codeValue = useWatch({
    control,
    name: 'code',
  });
  useEffect(() => {
    if (codeValue) {
      const formattedText = codeValue
        .replace(/\s?/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
      setFormattedCode(formattedText);
    } else {
      setFormattedCode('');
    }
  }, [codeValue]);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(SPACING.space_24),

          marginTop: scale(20),
        }}>
        <CustomTextInput
          control={control}
          name="code"
          formattedValue={formattedCode}
          maxLength={19}
          keyboardType="numeric"
          placeholderTextColor={'rgba(186, 182, 182, 1)'}
          placeholder="0000 0000 0000 0000"
          errorMessage={errors.code?.message}
          inputContainerStyle={{
            borderColor: 'transparent',
          }}
          rules={{
            required: 'This is required',
            minLength: {value: 19, message: 'Invalid card number'},
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: scale(10),
          }}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              flex: 1,
            }}>
            <CustomTextInput
              pointerEvents="none"
              control={control}
              name="licenseDate"
              placeholder="MM/YY"
              errorMessage={errors.licenseDate?.message}
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              rules={{
                required: 'This is required',
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <CustomTextInput
              control={control}
              name="cvv"
              maxLength={3}
              placeholder="CVC/CVV"
              errorMessage={errors.cvv?.message}
              keyboardType="numeric"
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              rules={{
                required: 'This is required',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: COLORS.Yellow,
            padding: scale(SPACING.space_16),
            borderRadius: scale(26),

            alignItems: 'center',
            marginTop: scale(SPACING.space_12),
          }}>
          <CustomText
            style={{
              color: COLORS.Black,
              fontFamily: FONTFAMILY.KoHo_Bold,
              fontSize: scale(FONTSIZE.size_14),
            }}>
            Add payment
          </CustomText>
        </TouchableOpacity>
      </View>

      <DatePicker
        mode="date"
        modal
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          const month = (date.getMonth() + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
          const year = date.getFullYear().toString().slice(-2);
          console.log(`${month}/${year}`);
          setValue('licenseDate', `${month}/${year}`);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <ModalSuccess isModalVisible={isVisible} onCloseModal={onCloseModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
});
