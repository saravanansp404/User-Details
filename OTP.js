import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SchoolDatabase.db' });
function OTP({route, navigation }) {
    const { username, otherParam } = route.params;
   
    const [OTP,  setOTP] = useState('');
    const [errortext, setErrortext] = useState('');
    
    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30))',
                  []
                );
              }
            }
          );
        })
        
      }, []);

     
    
    const insertData = () => {
 if(OTP == 9999){
  
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Student_Table (student_name) VALUES (?)',
            [username],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                navigation.navigate('Account');
              } else alert('Failed....');
            }
          );
        });
      }else{
        setErrortext('Please provide valid OTP');
      }
        // viewStudent();
     }
      

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text>We have send a one time password (OTP) To {username}</Text>
        <Text style={styles.errortext}>{errortext}</Text>
        <TextInput onChangeText={(OTP) =>
                  setOTP(OTP)
                } style={styles.input} placeholder="OTP" />
       

        

        <TouchableOpacity style={styles.button}>
          <Text  onPress={insertData} style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    width: '100%',
    height: 200,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    width:'100%',
    textAlign:'flex-end',
  },
  forgotPasswordButtonText: {
    color: '#20B2AA',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign:'right'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 40,
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
  },
  errortext:{
    color: '#dc3545',
  },
  button: {
    backgroundColor: '#20B2AA',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#20B2AA',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default OTP;