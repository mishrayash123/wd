import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {useState, useEffect,useContext} from 'react';
import {db } from "./firebase-config";
import { collection } from "firebase/firestore";
import {getDocs, } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {userid} from "../App"
import {doc, deleteDoc} from "firebase/firestore";


export default function Bookings() {
    const id = useContext(userid);
    const [Profilesdata,setProfilesdata] = useState([]);

    useEffect(() => {
       
        getprofilesdata();
    }, []);

    const getprofilesdata = async () => {
        const colRef = collection(db,id); 
        const snapshots = await getDocs(colRef);
        const docs = snapshots.docs.map(doc => doc.data());
        setProfilesdata(docs);
    }
    

    return (
        <ScrollView>
       <View>    
            {Profilesdata.filter(e=>e.id1.toUpperCase()===id.toUpperCase()).map((data1) => {
        return (
            <View  key={data1.email} style={
            styles.container
        }>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
            }}>
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
                        }>Class : {
                            data1.class
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
                        }>Message : </Text>
                        <Text style={
                            styles.location
                        }>{
                            data1.bio
                        }</Text>
                </View>
                </View>
                <TouchableOpacity style={
                    styles.loginBtn
                }
                onPress={() => {
                        setProfilesdata(Profilesdata.filter(e=>e.class!=data1.class))
                            deleteDoc(doc(db,id,data1.class));
                  }}
               >
                <Text style={
                    styles.loginText
                }>Delete</Text>
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
    userInfo: {
        alignItems: 'center',
        paddingHorizontal: 25
        
    },
    username: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    location: {
        fontSize: 10,
        color: 'white',
        margin:0
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
});