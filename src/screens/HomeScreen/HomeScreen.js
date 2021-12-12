import React from 'react'
import { Button, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export default function HomeScreen({props,navigation}) {
    const signout=()=>{
        console.log("Signing out");
        auth().signOut().then((res)=>{
            console.log("successfully signout");
            console.log({props});
            console.log({navigation});
            // navigation.navigate('Login')
            // navigation.navigate('Login')
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <View>
            <Text>Home Screen</Text>
            <Button color="#841584" title="Signout" onPress={signout}></Button>
        </View>
    )
}