import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {useState, useEffect} from 'react';
import {db } from "./firebase-config";
import { collection } from "firebase/firestore";
import {getDocs, } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Rating from 'react-native-star-rating';
import RatingInput from 'react-native-star-rating';
import Modal1 from 'react-native-modal';


export default function Details({ route}) {
    const [isVisible1, setIsVisible1] = useState(false);
    const [Profilesdata,setProfilesdata] = useState([]);
    const [rating,setRating] = useState(0);

    useEffect(() => {
        getprofilesdata();
    }, []);

    const getprofilesdata = async () => {
        const colRef = collection(db,"Profiles"); 
        const snapshots = await getDocs(colRef);
        const docs = snapshots.docs.map(doc => doc.data());
        setProfilesdata(docs);
    }

    const toggleModal1 = () => {
        setIsVisible1(!isVisible1);
    };
    

    return (
        <ScrollView>
        <View>
            {Profilesdata.filter(e=>e.email.toUpperCase()===route.params.id.toUpperCase()).map((data1) => {
        return (
           <View  key={data1.pic} style={
            styles.container
        }>
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
                        <Rating stars={4} maxStars={5} size={25} />
                        <Text style={
                            styles.username
                        }>
                            {
                            data1.name
                        }</Text>
                        <Text style={
                            styles.location
                        }><MaterialCommunityIcons name="phone" color={"green"} size={20} />   {
                            data1.phone
                        }</Text>
                        <Text style={
                            styles.location
                        }><MaterialCommunityIcons name="email" color={"red"} size={20} />   {
                            data1.email
                        }</Text>
                        <Text style={
                            styles.location
                        }><MaterialCommunityIcons name="home" color={"pink"} size={20} />  {
                            data1.address
                        }</Text>
                    <Text style={
                            styles.location
                        }>{
                            data1.dist
                        } {data1.state} <Text style={{color:"green"}
                      }>PinCode :</Text> {
                          data1.pin
                      }</Text>
                        <Text style={
                            styles.location
                        }><MaterialCommunityIcons name="account" color={"pink"} size={20} /> {
                            data1.category
                        }               <Text style={{color:"red"}
                      }>Avg Cost :</Text> {
                          data1.avgcharge
                      }</Text>
                      <MaterialCommunityIcons name="bio" color={"pink"} size={30} />
                        <Text style={
                            styles.bio
                        }>{
                            data1.bio
                        } </Text>
                    </View>
                    <TouchableOpacity style={
                    styles.loginBtn
                }
                onPress={toggleModal1}
               >
                <Text style={
                    styles.loginText
                }>Give Rating</Text>
            </TouchableOpacity>

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
        <RatingInput rating={rating} setRating={setRating} size={50}  maxStars={5} bordered={false}  />
        <TouchableOpacity style={
                    styles.loginBtn1
                }
                // onPress={toggleModal1}
               >
                <Text style={
                    styles.loginText1
                }>Submit</Text>
            </TouchableOpacity>
                    </View>
                </Modal1>
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
        marginBottom:5,
        marginHorizontal:90
    },
    userInfo: {
        alignItems: 'center',
        paddingHorizontal: 10
        
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white'
    },
    username: {
        fontSize: 24,
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
        width: "40%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "white"
    },
    loginText: {
        color: "red",
        fontSize: 14,
        fontWeight: 'bold'
    },
    loginBtn1: {
        width: "40%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "pink"
    },
    loginText1: {
        color: "blue",
        fontSize: 14,
        fontWeight: 'bold'
    },
});