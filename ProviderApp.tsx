import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CategoryProvider} from './src/Context/CategoryContext';
import {ItemProvider} from './src/Context/ListItemContext';
import {PaymentProvider} from './src/Context/PayMentContext';

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <CategoryProvider>
      <ItemProvider>
        <PaymentProvider>{children}</PaymentProvider>
      </ItemProvider>
    </CategoryProvider>
  );
};

const styles = StyleSheet.create({});
