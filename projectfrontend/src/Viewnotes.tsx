import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

function Viewnotes() {
  const [notes, Setnotes] = useState<any>([]);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const url = 'http://localhost:8080/notes/viewNotes';
    const axiosNotesPageCall = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(axiosNotesPageCall.data);
    Setnotes(axiosNotesPageCall.data);
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView>
      <Text>In View notes page!!!</Text>
      <FlatList
        data={notes}
        renderItem={({item}) => {
          return (
            <View style={{borderWidth: 1}}>
              <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              <Text>{item.notes}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default Viewnotes;
