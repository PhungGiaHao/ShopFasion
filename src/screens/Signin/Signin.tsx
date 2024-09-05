import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {scale} from 'react-native-size-matters';
import {useForm} from 'react-hook-form';
import CustomTextInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit', // triggers validation onBlur
  });
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onSubmit = (data: FormValues) => {
    if (data.email === 'user@gmail.com' && data.password === '123') {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 6,
          alignItems: 'center',
          paddingHorizontal: scale(SPACING.space_24),
        }}>
        <Image
          source={require('../../assets/images/owl.png')}
          resizeMode="contain"
          style={{
            width: scale(80),
            height: scale(80),
          }}
        />
        <View
          style={{
            marginTop: scale(60),
            gap: scale(SPACING.space_12),
          }}>
          <CustomTextInput
            name="email"
            control={control}
            placeholder="Email"
            secureTextEntry={false}
            placeholderTextColor={COLORS.Grey}
            onBlur={() => console.log('email field blurred')}
            errorMessage={errors.email?.message}
            rules={{
              required: 'Email cannot be empty',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is not valid',
              },
            }}
          />
          <CustomTextInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={false}
          
            onBlur={() => console.log('email field blurred')}
            errorMessage={errors.password?.message}
            rules={{
              required: 'Password cannot be blank',
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
            }}>
            <CustomText
              style={{
                color: COLORS.White,
                fontWeight: '500',
                fontSize: scale(FONTSIZE.size_14),
              }}>
              Forgot password?
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: COLORS.Yellow,
              padding: scale(SPACING.space_16),
              borderRadius: scale(26),

              alignItems: 'center',
              marginTop: scale(SPACING.space_24),
            }}>
            <CustomText
              style={{
                color: COLORS.Black,
                fontFamily: FONTFAMILY.KoHo_Bold,
                fontSize: scale(FONTSIZE.size_14),
              }}>
              Login
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.Black,
    alignItems: 'center',
  },
});
