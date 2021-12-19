import Toast from 'react-native-simple-toast';

let userInfo;
function showToast(message) {
    Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
}

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function setUser(user){
    userInfo=user;
}

function getUser(){
    return userInfo;
}

export {showToast,validateEmail,setUser,getUser};
