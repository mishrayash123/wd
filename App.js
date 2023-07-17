import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "./screens/firebase-config";

// Import your screen components
import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import Forget from './screens/Forget';
import Details from './screens/Details';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const App = () => {
  const [isthereuser, setisthereuser] = useState();
  const [uid1, setuid1] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisthereuser(true);
        setuid1(user.uid);
      } else {
        setisthereuser(false);
        setuid1(user.uid);
      }
    });
  }, [auth.currentUser]);


  return (
    <NavigationContainer>
      {
        isthereuser ? <Tab.Navigator>
        <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size}/>
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={Profile}
    initialParams={{ uid: uid1}}
    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size}/>
      ),
    }}
  />
  <Tab.Screen
    name="Register"
    component={Register}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,}}
  />
  <Tab.Screen
    name="Details"
    component={Details}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,}}
  />
  <Tab.Screen
    name="Login"
    component={Login}
    options={{  tabBarButton: () => null,
      tabBarVisible: false, }}
  />
  <Tab.Screen
    name="Forget"
    component={Forget}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,}}
  />
        </Tab.Navigator> : <Login />
      }
    </NavigationContainer>
  );
};



export default App;
