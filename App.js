import React, { useState, useEffect, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Create from './screens/Create';
import Book from './screens/Book';


const Tab = createBottomTabNavigator();
const userid = createContext();




const App = () => {
  const [isthereuser, setisthereuser] = useState();
  const [isprofile, setisprofile] = useState(true);
  const [uid1, setuid1] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisthereuser(true);
        setuid1(user.uid)
      } else {
        setisthereuser(false);
        setuid1("")
      }
    });
    getprofiledata();
  }, [auth.currentUser]);

  const getprofiledata = async () => {
    const docRef = doc(db, "Profiles",uid1 );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setisprofile(true);
      } else {
        setisprofile(false);
      }
}
  

  return (
    <NavigationContainer>
      <userid.Provider value={uid1}> 
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
  {
    isprofile ? <Tab.Screen
    name="Create"
    component={Create}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,}}
  />
  : <Tab.Screen
  name="Create"
  component={Create}
  options={{
    tabBarLabel: 'Create Profile',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="creation" color={"red"} size={30}/>
    ),
  }}
/>
  }
  <Tab.Screen
    name="Profile"
    component={Profile}
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
    name="Book"
    component={Book}
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
      </userid.Provider>
    </NavigationContainer>
  );
};



export default App;
export {userid};
