import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {scale} from 'react-native-size-matters';
import {BORDERRADIUS, COLORS, FONTFAMILY, SPACING} from '../theme/theme';
import CustomText from './CustomText';

interface CustomTextInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  iconName?: React.ReactNode;
  rightIconName?: React.ReactNode;
  onBlur?: () => void;
  errorMessage?: string;
  rules?: object;
  rightIconOnPress?: () => void;
  inputContainerStyle?: ViewStyle;
  formattedValue?: string;
}

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      name,
      control,
      iconName,
      rightIconName,
      onBlur,
      errorMessage,
      rules,
      rightIconOnPress,
      inputContainerStyle,
      formattedValue,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange, onBlur: hookFormOnBlur, value}}) => (
            <View style={[styles.inputContainer, inputContainerStyle]}>
              {iconName && <View>{iconName}</View>}
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor={COLORS.Grey}
                value={formattedValue !== undefined ? formattedValue : value}
                onChangeText={onChange}
                onBlur={() => {
                  hookFormOnBlur();
                  onBlur && onBlur();
                }}
                ref={ref}
                {...props}
              />
              {rightIconName && (
                <TouchableOpacity onPress={rightIconOnPress}>
                  {rightIconName}
                </TouchableOpacity>
              )}
            </View>
          )}
        />
        {errorMessage && (
          <CustomText style={styles.errorText}>{errorMessage}</CustomText>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_5,
    paddingHorizontal: SPACING.space_10,
   
    borderColor: COLORS.Grey,
    width: '100%',
    backgroundColor: COLORS.BackGroudTextInput,
  },
  input: {
    flex: 1,
    height: scale(40),
    paddingLeft: 10,
    fontFamily: FONTFAMILY.KoHo_Regular,
    fontSize: scale(14),
    color: COLORS.White,
  },
  errorText: {
    color: COLORS.Red,
    paddingHorizontal: SPACING.space_12,
    marginBottom: SPACING.space_12,
  },
});

export default CustomTextInput;
