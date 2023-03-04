import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, Image, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SchoolDatabase.db' });

export default function List() {
    const [data, SetDate] = useState('');
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM Student_Table',
              [],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
               
                SetDate(temp);
              }
            );
          });
        
      }, []);


  return (
    <View style={styles.container}>
     
     <FlatList
            data={data}
          
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
            

<View  style={styles.account}>
<Image source={{
          uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
        }} style={styles.accountImage} />
<View style={styles.accountContent}>
  <Text style={styles.accountName}>{item.student_id}</Text>
  <Text style={styles.accountBalance}>{item.student_name}</Text>
</View>
</View>
            }
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop:10,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    account: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    accountImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 20,
    },
    accountContent: {
      justifyContent: 'center',
    },
    accountName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    accountBalance: {
      fontSize: 16,
      color: '#999',
    },
  });