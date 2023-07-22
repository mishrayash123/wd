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
import Bookings from './screens/Bookings';
import Inbox from './screens/Inbox';
import CustomHeader from './components/CustomHeader';


const Tab = createBottomTabNavigator();
const userid = createContext();
const Mailid = createContext();





const App = () => {
  const [isthereuser, setisthereuser] = useState();
  const [isprofile, setisprofile] = useState(true);
  const [uid1, setuid1] = useState("");
  const [mail, setmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisthereuser(true);
        setuid1(user.uid)
        setmail(user.email);
      } else {
        setisthereuser(false);
        setuid1("")
        setmail("")
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
      <Mailid.Provider value={mail}>
      <>
      {
        isthereuser ? <Tab.Navigator>
        <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarLabel: 'Home',
      header: () => <CustomHeader Title={"Home"}/>,
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
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Create"}/>,}}
  />
  : <Tab.Screen
  name="Create"
  component={Create}
  options={{
    tabBarLabel: 'Create Profile',
    header: () => <CustomHeader Title={"Create"}/>,
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="creation" color={"red"} size={30}/>
    ),
  }}
/>
  }
  <Tab.Screen
    name="Inbox"
    component={Inbox}
    options={{
      tabBarLabel: 'Inbox',
      header: () => <CustomHeader Title={"Inbox"}/>,
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="message" color={color} size={size}/>
      ),
    }}
  />
  <Tab.Screen
    name="Bookings"
    component={Bookings}
    options={{
      tabBarLabel: 'Bookings',
      header: () => <CustomHeader Title={"Bookings"}/>,
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="book" color={color} size={size}/>
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarLabel: 'Profile',
      header: () => <CustomHeader Title={"Profile"}/>,
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size}/>
      ),
    }}
  />
  <Tab.Screen
    name="Book"
    component={Book}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Book"}/>,}}
  />
  <Tab.Screen
    name="Details"
    component={Details}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Details"}/>,}}
  />
  
        </Tab.Navigator> : <Tab.Navigator initialRouteName='Login'>
        <Tab.Screen
    name="Register"
    component={Register}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Register"}/>,}}
  />
        <Tab.Screen
    name="Login"
    component={Login}
    options={{  tabBarButton: () => null,
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Log in"}/>, }}
  />
  <Tab.Screen
    name="Forget"
    component={Forget}
    options={{ tabBarButton: () => null,
      tabBarVisible: false,
      header: () => <CustomHeader Title={"Forget"}/>,}}
  />
        </Tab.Navigator>
      }
      </>
      </Mailid.Provider> 
      </userid.Provider>
    </NavigationContainer>
  );
};



export default App;
export {userid,Mailid};
