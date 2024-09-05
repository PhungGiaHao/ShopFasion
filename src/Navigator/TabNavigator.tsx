import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {COLORS, FONTFAMILY, SPACING, FONTSIZE} from '../theme/theme';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Entypo from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserScreen from '../screens/UserScreen/UserScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
const Tab = createBottomTabNavigator();
const EmptyComponent = () => {
  return null;
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          alignItems: 'center',
          height: scale(80),
          paddingHorizontal: scale(SPACING.space_16),
        },
      }}>
      <Tab.Screen
        name="Home"
        
        component={HomeScreen}
        options={{
          unmountOnBlur: true,

          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,

                  // focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <FontAwesome
                  name="home"
                  size={verticalScale(20)}
                  color={focused ? COLORS.White : COLORS.Grey}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          unmountOnBlur: true,

          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  {
                    backgroundColor: COLORS.Yellow,
                    width: scale(38),
                    height: scale(38),
                    borderRadius: scale(30),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  // focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <FontAwesome
                  name="search"
                  size={verticalScale(16)}
                  color={COLORS.Black}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          unmountOnBlur: true,

          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  // focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <FontAwesome
                  name="user"
                  size={verticalScale(20)}
                  color={focused ? COLORS.White : COLORS.Grey}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    //   backgroundColor: COLORS.Black,
    //   padding: scale(SPACING.space_18),
    //   borderRadius: scale(SPACING.space_18 * 10),
  },
});
export default TabNavigator;
