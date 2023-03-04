import React, {useState, createRef} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from './OTP';
import List from './List';
const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(userEmail)) {
    
     
      navigation.navigate('OTP',{username:userEmail });
      
    }else{
      
      if( !(userEmail.match('[0-9]{10}')) ){
        
        setErrortext('Please provide valid Email / Moblie');
   }else{
    navigation.navigate('OTP',{username:userEmail });
   }
    }
  
  }
  return (
    <View style={styles.container}>
        

        <View style={styles.card}>

        <View style={styles.content}>
           
           <Image source={{uri:'https://bootdey.com/img/Content/avatar/avatar3.png'}} style={styles.image} />
           <Text style={styles.desc}>{'Get Started'}</Text>
       </View>
       <Text style={styles.started}>Get Started</Text>
       <Text style={styles.errortext}>{errortext}</Text>
      
        <TextInput style={styles.input} placeholder="Moblie / Phone"   keyboardType="default"
               
              
                 onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                } />
       

       
       <TouchableOpacity style={[styles.button, styles.login]}>
                <Text  onPress={handleSubmitPress} style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        

        
      </View>
    
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.facebook]}>
                <Text style={styles.buttonText}>Login with facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.google]}>
                <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content :{
        flex:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:60,
        marginBottom:80,
      
    },
    errortext:{
      color: '#dc3545',
    },
    title:{
        fontSize:24,
        color:'#8A2BE2',
        fontWeight:'bold',
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
      marginTop: 20,
      marginBottom: 25,
      width:100
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    image:{
        width:120,
        height:120,
        borderRadius:60,
        marginTop:39,
    },
    desc:{
        fontSize:18,
        textAlign:'center',
        marginTop:30,
        color:'#808080'
    },
    card: {
      
      
      padding: 20,
      marginTop: 20,
      width: '90%',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      width: '100%',
      marginTop:30,
    },
    buttonsContainer:{
        flex:2,
        flexDirection:'row',
        marginHorizontal:30,
        justifyContent:'space-around'
    },
    button:{
        width: '48%',
        height:50,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
    },
   
    facebook:{
        backgroundColor:'#4267B2'
    },
    login:{
      backgroundColor:'#28a745'
    },
    google:{
        backgroundColor:'#DB4437'
    }
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Account" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;