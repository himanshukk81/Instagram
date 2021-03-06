import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen,UserScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import firebase from '@react-native-firebase/app';
import firebaseConfig from './config/config';

import auth from '@react-native-firebase/auth';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth().onAuthStateChanged((user)=>{
      if(user){
        setUser(user);
        // console.log('Logged in',user);
      }
      else{
        setUser(null);
        console.log('Logged out');
      }
    })
  },[user]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="Users">
            
            {/* {props => <UserScreen/> } */}
            {props => <UserScreen {...props} extraData={user} />}

          </Stack.Screen>
          </>
          
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
