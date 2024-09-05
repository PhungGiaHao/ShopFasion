import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Signin from '../screens/Signin/Signin';
import ProducDetail from '../screens/ProductDetail/ProductDetail';
import Payment from '../screens/Payment/Payment';
import AddPayment from '../screens/AddPayment/AddPayment';

const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Plash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SignIn"
        component={Signin}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="MainTab"
        component={TabNavigator}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProducDetail}
        options={{headerShown: false, animation: 'slide_from_right'}}
        />
      <Stack.Screen
        name="PayMent"
        component={Payment}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{headerShown: false, animation: 'slide_from_right'}}
        />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
