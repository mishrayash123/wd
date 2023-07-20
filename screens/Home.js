import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from "react-native";
import {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {db } from "./firebase-config";
import { collection } from "firebase/firestore";
import {getDocs, } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function Home({ navigation }) {
    const [pincode, setpincode] = useState('');
    const [city, setcity] = useState("");
    const [Profilesdata,setProfilesdata] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
       
        getprofilesdata();
    }, []);

    const getprofilesdata = async () => {
        const colRef = collection(db,"Profiles"); 
        const snapshots = await getDocs(colRef);
        const docs = snapshots.docs.map(doc => doc.data());
        setProfilesdata(docs);
    }

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const Filter = () => {
        setProfilesdata(Profilesdata.filter(e=>e.dist.toUpperCase()===city.toUpperCase()).filter(e=>parseInt(e.pin)===parseInt(pincode)));
    };
    

    return (
        <ScrollView>
        <View>
            <View style={{flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }}>
            <TouchableOpacity style={
                    styles.loginBtn1
                }
                onPress={() => {
                    toggleModal();
                  }}
               >
                <Text style={
                    styles.loginText1
                }>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={
                    styles.loginBtn1
                }
                onPress={() => {
                    getprofilesdata();
                  }}
               >
                <Text style={
                    styles.loginText1
                }>Reset Filter</Text>
            </TouchableOpacity>
            </View>
            <Modal isVisible={isVisible}
                    onBackdropPress={toggleModal}>
                        <ScrollView>
                    <View style={
                        {
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 25
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
                                Filter</Text>
                       
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
                            onChangeText={setcity}
                            value={city}
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
                            onChangeText={setpincode}
                            value={pincode}
                            placeholder="      PinCode"/>
                        <TouchableOpacity style={
                                styles.loginBtn1
                            }
                            onPress={
                                () => {
                                    Filter();
                                    toggleModal();
                                }
                        }>
                            <Text style={
                                styles.loginText1
                            }>Filter</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </Modal>           
            {Profilesdata.map((data1) => {
        return (
            <View  key={data1.pic} style={
            styles.container
        }>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <View>
                    <Image source={
                            {uri: data1.pic}
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
                        data1.name
                    }</Text>
                <Text style={
                        styles.location
                    }>{
                        data1.dist
                    } {data1.state}</Text>
                    <Text style={
                        styles.location
                    }><MaterialCommunityIcons name="account" color={"pink"} size={20} /> {
                        data1.category
                    }</Text>
                </View>
                </View>
                <TouchableOpacity style={
                    styles.loginBtn
                }
                onPress={() => {
                    navigation.navigate('Details', {
                      id:data1.email
                    });
                  }}
               >
                <Text style={
                    styles.loginText
                }>Full profile</Text>
            </TouchableOpacity>
        </View>
        );
      })}
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop:10,
        paddingBottom:10,
        borderColor:'black',
        borderRadius:10,
        margin:10,
        marginTop:20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginTop: 2,
        marginHorizontal:0
    },
    userInfo: {
        alignItems: 'center',
        paddingHorizontal: 25
        
    },
    username: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    location: {
        fontSize: 16,
        color: 'white',
        margin:2
    },
    loginBtn: {
        width: "30%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink"
    },
    loginText: {
        color: "blue",
        fontSize: 14,
        fontWeight: 'bold'
    },
    loginBtn1: {
        width: "40%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "blue",
        marginLeft:25,
    },
    loginText1: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
});