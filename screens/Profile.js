import React, { useContext } from "react";
import {userid} from "../App"
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
import Modal1 from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from "firebase/firestore";
import {db} from "./firebase-config";
import {getDoc} from "firebase/firestore";
import {storage} from "./firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {onSnapshot} from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth} from "./firebase-config";
import {signOut} from "firebase/auth";


export default function Profile({navigation}) {
    const id = useContext(userid);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [bio, setbio] = useState('');
    const [address, setaddress] = useState('');
    const [avgcharge, setavgcharge] = useState('');
    const [url, seturl] = useState("");
    const [textoimage, settextoimage] = useState("");
    const [data, setdata] = useState([]);
    const [dist, setdist] = useState('');
    const [state, setstate] = useState('');
    const [pin, setpin] = useState('');
    const [len, setlen] = useState();

  useEffect(() => {

    getprofiledata();
  }, [data]);




    const logout = async () => {
        signOut(auth).then(() => {
        }).catch((error) => {});
    };


    const getprofiledata = async () => {
        const docRef = doc(db, "Profiles",id );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const unsub = onSnapshot(doc(db, "Profiles", id), (doc) => {
                setdata(doc.data());
            });
          } else {
            setlen(0);
          }
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
        const washingtonRef = doc(db, "Profiles", id);
        await updateDoc(washingtonRef, {
            name: name,
            email: email,
            phone: phone,
            bio: bio,
            address: address,
            state: state,
            dist: dist,
            pin: pin,
            avgcharge: avgcharge,
            pic: url,
          });
        settextoimage("")
        alert("Updated");
        toggleModal();
    }
    const toggleModal1 = () => {
        setIsVisible1(!isVisible1);
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
        getprofiledata();
    };
    
    return (
      <ScrollView>
        <TouchableOpacity style={
                    styles.loginBtn2
                }
                onPress={
                    () => toggleModal1()
            }>
                <Text style={
                    styles.loginText2
                }>Logout</Text>
            </TouchableOpacity>
        {
            len===0 ?<View style={
                styles.container
            }>
                <Text style={
                            styles.location
                        }>Please Create your Profile for Shining/Earning..........</Text>
                        <TouchableOpacity style={
                    styles.loginBtn3
                }
                onPress={() => {
                    navigation.navigate('Create');
                  }}
               >
                <Text style={
                    styles.loginText3
                }>Create profile</Text>
            </TouchableOpacity>
            </View> : <ScrollView><View style={
                styles.container
            }>
                    <View >
                        <Image source={
                                {uri: data.pic}
                            }
                            style={
                                styles.profileImage
                            }/>
                    </View>
                    <TouchableOpacity style={
                    styles.loginBtn4
                }
               >
                <Text style={
                    styles.loginText4
                }>{data.status}</Text>
            </TouchableOpacity>
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
        }
                <Modal isVisible={isVisible}
                    onBackdropPress={toggleModal}>
                        <ScrollView>
                    <View style={
                        {
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 25,
                        }
                    }>
                        <TouchableOpacity onPress={toggleModal}>
              <Text style={{
    fontSize: 25,
    color: 'red',
    marginLeft:250
  }}>X</Text>
            </TouchableOpacity>
                        <Text style={
                                {
                                    color: "blue",
                                    padding:10,
                                    fontSize:20,
                                     marginBottom:10,
                                     fontWeight:"bold"
                                }
                            }>
                                Update your profile</Text>
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
                            }>Update</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </Modal>
                <Modal1 isVisible={isVisible1}
                    onBackdropPress={toggleModal1}>
                    <View style={
                        {
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }>
                       <TouchableOpacity style={
                    styles.loginBtn2
                }
                onPress={
                    () => {
                        logout()
                        toggleModal1()
                    }
            }>
                <Text style={
                    styles.loginText2
                }>Logout</Text>
            </TouchableOpacity>
                    </View>
                </Modal1>
                </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop:10,
        paddingBottom:20,
        borderColor:'black',
        borderRadius:10,
        margin:10,
        marginTop:20,
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
        width: "50%",
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
    loginBtn2: {
        width: "40%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft:10,
        backgroundColor: "white"
    },
    loginText2: {
        color: "red",
        fontSize: 14,
        fontWeight: 'bold'
    },
    loginBtn3: {
        width: "80%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "white"
    },
    loginText3: {
        color: "red",
        fontSize: 14,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 24,
        marginTop: 0,
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
    },
    loginBtn4: {
        width: "30%",
        borderRadius: 25,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "pink"
    },
    loginText4: {
        color: "blue",
        fontSize: 14,
        fontWeight: 'bold'
    },
});
