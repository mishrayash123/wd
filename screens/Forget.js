import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {sendPasswordResetEmail} from "firebase/auth";
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


export default function Forget({navigation}) {
  const [email, setEmail] = useState("");
  const [err, seterr] = useState("");


  const forgetpassword = async () => {
    sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset email sent to your provided email");
    }).catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
    });

};
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./Seekguru.png")} /> 
      <StatusBar style="auto" />
      <Text style={styles.forgot_button}>Send a Password reset mail....</Text> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={() => navigation.navigate("Login")}>Log in</Text> 
      </TouchableOpacity>   
      <TouchableOpacity style={styles.loginBtn} onPress={() => forgetpassword()}>
        <Text style={styles.loginText}>Send</Text> 
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
    marginBottom: 0,
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
    color:"blue"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  loginText :{
    color : "white"
  }
});