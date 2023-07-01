import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Import your screen components
import Home from './screens/Home';
import Profile from './screens/Profile';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// };

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Profile" component={Profile} />
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
  
      </Tab.Navigator>
    </NavigationContainer>
  );
};




export default App;
