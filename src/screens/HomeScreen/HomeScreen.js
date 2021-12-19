import React ,{useEffect, useState} from 'react'
import { Button, Text, View  ,FlatList ,Alert,ActivityIndicator} from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { getUser } from '../../Utility';

export default function HomeScreen({props,navigation}) {

    let data=[
                
            ]
    const [users,setUsers] =useState(data);
    const [loading,setLoading] =useState(false)

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

     deleteUser =(userId)=>{
        Alert.alert(
            "Confirmation",
            "Are you sure want to remove?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                 database().ref('/users/'+userId).remove();
                 if(!users.length<=1){
                    fetchUsers();
                 }
                 
              }}
            ]
          );
    }
    
    useEffect(()=>{
        fetchUsers()
        
    },[]);



    const fetchUsers=()=>{
        // setLoading(true);
        let userlist=[];

        console.log(getUser());
        const users=database().ref(`users/`).on('value', snapshot => {

            // console.log({values22:snapshot});
            if(snapshot.val()!=null){
                let responselist = Object.values(snapshot.val())
                setUsers(responselist);
                setLoading(false);
            }
            else{
                setUsers([]);
            }
            
        });
        // const users = database().ref('users').on('child_added', (snapshot) => {
        //     const exists = (snapshot.val()!=null);
        //     if(exists) data = snapshot.val();
        //     // console.log({data});
        //     userlist.push(data);
        //     console.log({userlist});
        //     console.log("updated 6666");
        //     setLoading(false);
            
        // })

       
        // setUsers(userlist);
    }

    renderEmptyContainer=()=>{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
                <Text style={{fontWeight:'bold',fontSize:23}}>The list is empty</Text>
            </View>
        )
    }
    listItem=(data)=>{
        return(
            <View style={styles.listItem}> 
                <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-evenly'}}>
                    <View style={{flexDirection:'column',width:'90%'}}>
                        <Text style={[styles.itemFont,styles.itemColor]}>{data.name}</Text>
                        <Text style={[styles.descFont,styles.itemColor]}>{data.email}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight 
                                    onPress={() => {
                                        console.log("Deleted");
                                        this.deleteUser(data.id);
                                    }} style={{marginEnd:6}}>
                            <Icon2 name="delete" size={26} color="#900" />
                        </TouchableHighlight>
                        <TouchableHighlight 
                                    onPress={() => {
                                        console.log({data})
                                        navigation.navigate('Users',{data})
                                        console.log("Edit");
                                    }}>
                            <Icon name="edit" size={26} color="#900" />
                        </TouchableHighlight>

                    </View>   
                </View>    
            </View>
        )
    }
    if (loading) {
        return <ActivityIndicator />;
    }
    return (
        <View style={{flex:1}}>
            <View style={{}}>
                <View style={{alignSelf:'flex-end',margin:15}}>
                    <TouchableHighlight onPress={() => {
                                        // console.log("Edit");
                                        navigation.navigate('Users')
                                    }}>
                        <Icon name="plus-square" size={26} color="#900" />
                    </TouchableHighlight>
                </View>
               
               <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this.listItem(item)}
                    ListEmptyComponent={this.renderEmptyContainer()}
                    // contentContainerStyle={{paddingBottom:120}}
               />                
            </View>

            {/* <View style={styles.addUserView}>   
                <Button color="#FFF" title="Add User" onPress={addUser}></Button>
            </View> */}

            <View style={styles.bottomView}>   
                <Button color="#FFF" title="Signout" onPress={signout}></Button>
            </View>
        </View>
    )
}

