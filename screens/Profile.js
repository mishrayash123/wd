import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase-config";
import {getDoc} from "firebase/firestore";
import {storage} from "./firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase-config";
import {onSnapshot} from "firebase/firestore";
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function Profile() {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [bio, setbio] = useState('');
    const [address, setaddress] = useState('');
    const [category, setcategory] = useState('');
    const [avgcharge, setavgcharge] = useState('');
    const [url, seturl] = useState("");
    const [textoimage, settextoimage] = useState("");
    const [uid1, setuid1] = useState("");
    const [data, setdata] = useState([]);
    const [dist, setdist] = useState('');
    const [state, setstate] = useState('');
    const [pin, setpin] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setuid1(user.uid);
            } else {
                setuid1("");
            }
        });
        getprofiledata();
    }, [auth.currentUser]);


    const getprofiledata = async () => {
        const unsub = onSnapshot(doc(db, "Profiles", uid1), (doc) => {
            setdata(doc.data());
        });
    }


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
            const imageRef = ref(storage, uid1);
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
        const docRef = doc(db, "Profiles", uid1);
        const docSnap = await getDoc(docRef);
        setDoc(doc(db, "Profiles", uid1), {
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
            pic: url
        });
        settextoimage("")
        toggleModal();
    }


    const toggleModal = () => {
        setIsVisible(!isVisible);
        getprofiledata();
    };

    // const handleSubmit = () => {
    // toggleModal();
    // };
    return (
      <ScrollView>
        <View style={
            styles.container
        }>
            <View>
                <View>
                    <Image source={
                            {uri: data.pic}
                        }
                        style={
                            styles.profileImage
                        }/>
                </View>
                <View style={
                    styles.userInfo
                }>
                    <Text style={
                        styles.username
                    }>
                        {
                        data.name
                    }</Text>
                    <Text style={
                        styles.location
                    }><MaterialCommunityIcons name="phone" color={"green"} size={20} />   {
                        data.phone
                    }</Text>
                    <Text style={
                        styles.location
                    }><MaterialCommunityIcons name="email" color={"red"} size={20} />   {
                        data.email
                    }</Text>
                    <Text style={
                        styles.location
                    }><MaterialCommunityIcons name="home" color={"pink"} size={20} />  {
                        data.address
                    }</Text>
                <Text style={
                        styles.location
                    }>{
                        data.dist
                    } {data.state} <Text style={{color:"green"}
                  }>PinCode :</Text> {
                      data.pin
                  }</Text>
                    <Text style={
                        styles.location
                    }><MaterialCommunityIcons name="account" color={"pink"} size={20} /> {
                        data.category
                    }               <Text style={{color:"red"}
                  }>Avg Cost :</Text> {
                      data.avgcharge
                  }</Text>
                  <MaterialCommunityIcons name="bio" color={"pink"} size={30} />
                    <Text style={
                        styles.bio
                    }>{
                        data.bio
                    } </Text>
                </View>
            </View>
            <ScrollView>
            <View>
                <Modal isVisible={isVisible}
                    onBackdropPress={toggleModal}>
                    <View style={
                        {
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 25
                        }
                    }>
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
                                <Picker selectedValue={category}
                            onValueChange={
                                (itemValue, itemIndex) => setcategory(itemValue)
                        }>
                            <Picker.Item label="Caters" value="Caters"/>
                            <Picker.Item label="Tuter" value="Tuter"/>
                            <Picker.Item label="Tent" value="Tent"/>
                            <Picker.Item label="Sound" value="Sound"/>
                            <Picker.Item label="Others" value="Others"/>
                        </Picker>
                        </View>
                        <TouchableOpacity style={
                                styles.loginBtn1
                            }
                            onPress={
                                () => handlesubmit()
                        }>
                            <Text style={
                                styles.loginText1
                            }>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            </ScrollView>
            <TouchableOpacity style={
                    styles.loginBtn
                }
                onPress={
                    () => toggleModal()
            }>
                <Text style={
                    styles.loginText
                }>Update profile</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop:20,
        paddingBottom:20,
        borderColor:'black',
        borderRadius:10,
        margin:10,
        marginTop:40
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 10,
        marginHorizontal:90
    },
    userInfo: {
        alignItems: 'center',
        paddingHorizontal: 10
        
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "pink"
    },
    loginText: {
        color: "blue",
        fontSize: 14,
        fontWeight: 'bold'
    },
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
    },
    username: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white'
    },
    location: {
        fontSize: 16,
        color: 'white'
    }
});
