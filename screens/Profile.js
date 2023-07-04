import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useState ,useEffect} from 'react';
import { Button, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc} from "firebase/firestore";
import { db } from "./firebase-config"; 
import {  getDoc } from "firebase/firestore";
import {storage} from "./firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"




export default function Profile () {

  const [isVisible, setIsVisible] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pic, setpic] = useState(null);
  const [phone, setphone] = useState('');
  const [bio, setbio] = useState('');
  const [address, setaddress] = useState('');
  const [category, setcategory] = useState('');
  const [avgcharge, setavgcharge] = useState('');
  const [url, seturl] = useState("");

  


  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setpic(result.uri);
      const imageRef = ref(storage, uid);
        if (result.uri) {
            uploadBytes(imageRef, result.uri).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    seturl(url);
                   
                }).catch((error) => {
                })
                setpic(null);
            }).catch((error) => {
                console.log(error.message);
            })
        }
      
    }
  };

  const handlesubmit = async () => {
    console.log(uid)
    const docRef = doc(db, uid,name );
                            const docSnap = await getDoc(docRef);
                                setDoc(doc(db,uid,name), {
                                    name : name,
                                    email : email,
                                    phone : phone,
                                    bio : bio,
                                    address:address,
                                    category: category,
                                    avgcharge : avgcharge,
                                    pic:url  
                                  }
                                  );
    toggleModal();
    }



  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  // const handleSubmit = () => {
  //   toggleModal();
  // };
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('')}
        style={styles.profileImage}
      /> */}
      <View>
      <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 20,borderRadius:25 }}>
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setname}
            value={name}
            placeholder="      Name"
          />
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setemail}
            value={email}
            placeholder="      Email"
          />
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setphone}
            value={phone}
            placeholder="      Phone"
          />
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setaddress}
            value={address}
            placeholder="      Complete Address"
          />
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setcategory}
            value={category}
            placeholder="      Category"
          />
          <TextInput
            style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
            onChangeText={setavgcharge}
            value={avgcharge}
            placeholder="      Average Charge"
          />
          <TextInput
       style={{ height: 40, borderColor: 'blue', borderWidth: 1, marginBottom: 10,borderRadius:25,paddingLeft:20 }}
        multiline={true}
        numberOfLines={4}
        onChangeText={setbio}
        value={bio}
        placeholder="    Bio"
      />
          
          <View >
          <Text style={{color:"red",margin:2}}> * Select an image for your profile</Text> 
      {pic && (
        <Image source={{ uri: pic }} 
         />
      )}

      <Button title="Select Image" onPress={handleSelectImage} />
      {/* <Button title="Upload Image" onPress={handleUploadImage} /> */}
    </View>
          <TouchableOpacity style={styles.loginBtn1} onPress={() => handlesubmit()}>
        <Text style={styles.loginText1}>Update</Text> 
      </TouchableOpacity> 
        </View>
      </Modal>
    </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}></Text>
        <Text style={styles.bio}>
          
        </Text>
        <Text style={styles.location}></Text>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => toggleModal()}>
        <Text style={styles.loginText}>Update profile</Text> 
      </TouchableOpacity> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop : 30,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "blue",
  },
  loginText :{
    color : "white",
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginBtn1: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "blue",
  },
  loginText1 :{
    color : "white",
    fontSize: 14,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    marginTop : 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#888888',
  },
});





