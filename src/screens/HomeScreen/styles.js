import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    listItem:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#836F6B',
        margin:10,
        padding:10,
        flexDirection:'column'
    },
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
    descFont:{
        fontSize:13
    },
    itemFont:{
        fontSize:17
    },
    itemColor:{
        color:'#FFF'
    }
})