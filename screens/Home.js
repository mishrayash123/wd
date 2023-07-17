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


export default function Home({ navigation }) {

    const [Profilesdata,setProfilesdata] = useState([]);

    useEffect(() => {
       
        getprofilesdata();
    }, []);

    const getprofilesdata = async () => {
        const colRef = collection(db,"Profiles"); 
        const snapshots = await getDocs(colRef);
        const docs = snapshots.docs.map(doc => doc.data());
        setProfilesdata(docs);
    }

   
    

    return (
        <ScrollView>
        <View>
            {Profilesdata.map((data1) => {
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
        marginHorizontal:90
    },
    userInfo: {
        alignItems: 'center',
        paddingHorizontal: 10
        
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
        backgroundColor: "pink"
    },
    loginText: {
        color: "blue",
        fontSize: 14,
        fontWeight: 'bold'
    },
});