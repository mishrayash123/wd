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
import {Button, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase-config";
import {getDoc} from "firebase/firestore";
import {storage} from "./firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {Picker} from '@react-native-picker/picker';


export default function Create() {
    const id = useContext(userid);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [bio, setbio] = useState('');
    const [address, setaddress] = useState('');
    const [category, setcategory] = useState('Tuter');
    const [avgcharge, setavgcharge] = useState('');
    const [url, seturl] = useState("");
    const [textoimage, settextoimage] = useState("");
    const [dist, setdist] = useState('');
    const [state, setstate] = useState('');
    const [pin, setpin] = useState('');

   
    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [
                4, 3
            ],
            quality: 1
        });

        if (! result.canceled) {
            const fetchResponse = await fetch(result.assets[0].uri);
            const theBlob = await fetchResponse.blob();
            const imageRef = ref(storage, id);
            if (result.assets[0].uri) {
                uploadBytes(imageRef, theBlob).then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        settextoimage("Image Selected")
                        seturl(url);
                    }).catch((error) => {})
                }).catch((error) => {
                    console.log(error.message);
                })
            }
        }
    };

    const handlesubmit = async () => {
        const docRef = doc(db, "Profiles", id);
        const docSnap = await getDoc(docRef);
        setDoc(doc(db, "Profiles", id), {
            name: name,
            email: email,
            phone: phone,
            bio: bio,
            address: address,
            state: state,
            dist: dist,
            pin: pin,
            category: category,
            avgcharge: avgcharge,
            pic: url,
        });
        settextoimage("")
        alert("Profile Created");
    }

    return (
        <ScrollView>
        <View>
        <View style={
                        {
                            padding: 20, 
                        }
                    }>
                        <Text style={
                                {
                                    color: "blue",
                                    padding:10,
                                    fontSize:20,
                                     marginBottom:10,
                                     fontWeight:"bold"
                                }
                            }>
                                Create your profile</Text>
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
                            onChangeText={setavgcharge}
                            value={avgcharge}
                            placeholder="      Average Charge"/>
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
                            placeholder="    Bio"/>
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
                            onChangeText={setdist}
                            value={dist}
                            placeholder="      District"/>
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
                            onChangeText={setstate}
                            value={state}
                            placeholder="      State"/>
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
                            onChangeText={setpin}
                            value={pin}
                            placeholder="      PinCode"/>
                        <View>
                            <Text style={
                                {
                                    color: "red",
                                    margin: 2
                                }
                            }>
                                * Select an image for your profile</Text>
                            <Button title="Profile Image"
                                onPress={handleSelectImage}/>
                            <Text style={
                                {
                                    color: "red",
                                    margin: 2
                                }
                            }>
                                {textoimage}</Text>
                                {/* <Picker selectedValue={category}
                            onValueChange={
                                (itemValue, itemIndex) => setcategory(itemValue)
                        }>
                            <Picker.Item label="Tuter" value="Tuter"/>
                        </Picker> */}
                        </View>
                        <TouchableOpacity style={
                                styles.loginBtn1
                            }
                            onPress={
                                () => handlesubmit()
                        }>
                            <Text style={
                                styles.loginText1
                            }>Create</Text>
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

