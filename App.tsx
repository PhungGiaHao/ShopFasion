import React from 'react';
import type {PropsWithChildren} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from './src/Navigator/App';
import {StyleSheet} from 'react-native';
import {AppProvider} from './ProviderApp';
function App(): React.JSX.Element {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
