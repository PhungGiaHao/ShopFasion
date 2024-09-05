import React from 'react';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';

interface SuccessProps {
  text1: string; // Ensure text1 is always a string
}

export const toastConfig = {
  success: ({text1, text2, ...rest}: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text1={text1}
      text2={text2}
    />
  ),
  deletedToast: ({text1}: SuccessProps) => (
    <BaseToast
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text1={text1}
    />
  ),
};