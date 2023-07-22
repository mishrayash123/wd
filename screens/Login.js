import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase-config';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";


export default function Login({ navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, seterr] = useState("");

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => { // Signed in
        const user = userCredential.user;
        // console.log("user signed in successfully")
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        seterr(errorCode);
    });
    
};


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./Seekguru.png")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View>
      <Text style={styles.err}>{err}</Text>  
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={() => navigation.navigate("Forget")}>Forget Password ?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={() => navigation.navigate("Register")}>New user ?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
        <Text style={styles.loginText}>Log in</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 0,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 5,
    color : "blue"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "black",
  },
  loginText :{
    color : "white"
  },
  err : {
    color :"red"
  }
});