import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Import your screen components
import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import Forget from './screens/Forget';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Forget" component={Forget} />
//     </Stack.Navigator>
//   );
// };



const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
  name="Home"
  component={Home}
  options={{
    tabBarLabel: 'Home',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home" color={color} size={size} />
    ),
  }}
/>
<Tab.Screen
  name="Profile"
  component={Profile}
  options={{
    tabBarLabel: 'Profile',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account" color={color} size={size} />
    ),
  }}
/>
<Tab.Screen
  name="Register"
  component={Register}
  options={{ tabBarVisible: false }}
/>
<Tab.Screen
  name="Login"
  component={Login}
  options={{ tabBarVisible: false }}
/>
<Tab.Screen
  name="Forget"
  component={Forget}
  options={{ tabBarVisible: false }}
/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};




export default App;
