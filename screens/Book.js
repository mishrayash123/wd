import React, { useContext } from "react";
import {userid} from "../App"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase-config";
import {getDoc} from "firebase/firestore";


export default function Book({route,navigation}) {
    const id = useContext(userid);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [bio, setbio] = useState('');
    const [clas, setclas] = useState('');
    const [address, setaddress] = useState('');
    
// request
    const handlesubmit = async () => {
        const docRef = doc(db,route.params.id,clas);
        const docSnap = await getDoc(docRef);
        setDoc(doc(db, route.params.id, clas), {
            name: name,
            email: route.params.id,
            phone: phone,
            bio: bio,
            class:clas,
            address: address,
        });
    }

    //bookings
    const handlesubmit1 = async () => {
        const docRef = doc(db,id, clas);
        const docSnap = await getDoc(docRef);
        setDoc(doc(db,id, clas), {
            name: name,
            email: email,
            phone: phone,
            bio: bio,
            class:clas,
            address: address,
            id1:id
        });
        alert("Your message has been sent.......Tuter will contact you with in 24 hours....")
        navigation.navigate('Bookings');
    }

    return (
        <ScrollView>
        <View>
        <View style={
                        {
                            padding: 20, 
                            marginTop:30
                        }
                    }>
                         <Text style={
                                {
                                    color: "blue",
                                    padding:10,
                                    fontSize:20,
                                     marginBottom:30,
                                     fontWeight:"bold"
                                }
                            }>
                                Book your Tuter............</Text>
                        <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            onChangeText={setname}
                            value={name}
                            placeholder="      Name"/>
                        <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            onChangeText={setemail}
                            value={email}
                            placeholder="      Email"/>
                        <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            onChangeText={setphone}
                            value={phone}
                            placeholder="      Phone"/>
                            <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setclas}
                            value={clas}
                            placeholder="    Class"/>
                        <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setbio}
                            value={bio}
                            placeholder="    Message"/>
                        <TextInput style={
                                {
                                    height: 40,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    paddingLeft: 20
                                }
                            }
                            onChangeText={setaddress}
                            value={address}
                            placeholder="      Complete Address"/>
                        <TouchableOpacity style={
                                styles.loginBtn1
                            }
                            onPress={
                                () => {
                                    handlesubmit()
                                    handlesubmit1()
                                } 
                        }>
                            <Text style={
                                styles.loginText1
                            }>Book</Text>
                        </TouchableOpacity>
                    </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loginBtn1: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "blue"
    },
    loginText1: {
        color: "white",
        fontSize: 14,
        fontWeight: 'bold'
    }
});



