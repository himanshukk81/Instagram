import React ,{useEffect, useState} from 'react'
import { Button, Text, View ,StyleSheet ,TextInput } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showToast, validateEmail } from '../../Utility';

export default function UserScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [userId, setUserId] = useState('');
    const [disableBtn, setBtnDisable] = useState(false);

   
    useEffect(()=>{
        let user=props?.route?.params?.data;
        console.log({user});
        // console.log(user?.name);
        setName(user?.name);
        setEmail(user?.email);
        setPass(user?.password);
        setUserId(user?.id)
    },[]);

    const addUser=()=>{

        let warningMssg='';
        if(!name){
            warningMssg='Please Enter Name!';
        }
        else if(!email){
            warningMssg='Please Enter Email!';
        }
        else if(!validateEmail(email)){
            warningMssg='Please Enter Valid Email!';
        }

        else if(!password){
            warningMssg='Please Enter Password!';
        }
        else if(password.length<6){
            warningMssg='Password length require >=6';
        }

        if(warningMssg!=''){
            showToast(warningMssg);
            return;
        }
        
        setBtnDisable(true);

        console.log("user_id"+userId);
        if(userId){
            database()
            .ref('/users/'+userId)
            .set({
                name: name,
                email: email,
                password:password,
                id:userId
            })
            .then(() => {
                setBtnDisable(false);    
                props.navigation.goBack(null);
                console.log('User Updated');   
            })
            .catch((err)=>{
                setBtnDisable(false);
                showToast('something went wrong please try again');
                console.log(err);
            })
        }
    
        else{
            const newReference = database().ref('/users').push();
            console.log('Auto generated key: ', newReference.key);

            newReference
            .set({
                name: name,
                email: email,
                password:password,
                id:newReference.key
            })
            .then(() => {
                setBtnDisable(false);    
                props.navigation.goBack(null);
                console.log('User Added')
            })
            .catch((err)=>{
                setBtnDisable(false);
                showToast('something went wrong please try again');
                console.log(err);
            })
        }
    
    }   
    return (
        <View style={{flex:1}}>
            <View style={{}}>

                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setName(value)}
                    placeholder="Enter Name"
                    placeholderTextColor={'#444'}
                    value={name}
                />
               
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    placeholderTextColor={'#444'}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setPass(value)}
                    placeholder="Enter Password"
                    placeholderTextColor={'#444'}
                    secureTextEntry={true}
                />

                {/* <Button color="#925042" title="Add User" onPress={addUser}></Button> */}

                
            </View>

            <View style={styles.addUserView}>   
                <Button color="#FFF" title={userId?'Update User':'Add User'} onPress={addUser} disabled={disableBtn}></Button>
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    footer: {
        height: 200
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 10, //Here is the trick
    },

    addUserView:{
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 70,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});