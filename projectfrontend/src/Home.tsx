import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function Home({navigation}: any) {
  const [response, Setresponse] = useState<any>();

  const [token, Settoken] = useState<any>();

  const [notesObject, SetnotesObject] = useState<{
    title: string;
    notes: string;
    email: string | null;
  }>({title: '', notes: '', email: ''});

  const getTokenEmail = async () => {
    const tokenExtract = await AsyncStorage.getItem('token');
    const getEmail = await AsyncStorage.getItem('email');
    Settoken(tokenExtract);
    SetnotesObject(prev => ({...prev, email: getEmail}));
  };
  const saveButtonHandler = async () => {
    const url = 'http://localhost:8080/notes/createNotes';
    const axiosHomePageCall = await axios.post(url, notesObject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    SetnotesObject(prev => ({...prev, title: ''}));
    SetnotesObject(prev => ({...prev, notes: ''}));
    const result = await axiosHomePageCall.data;
    Setresponse(result);
    Alert.alert(response);
  };

  useEffect(() => {
    getTokenEmail();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 9}}>
        <TextInput
          placeholder="Add Title(Max Length 25)"
          maxLength={25}
          style={{borderBottomWidth: 2, fontWeight: 'bold', fontSize: 20}}
          value={notesObject.title}
          onChangeText={value =>
            SetnotesObject(prev => ({...prev, title: value}))
          }
        />
        <TextInput
          placeholder="Add Notes"
          multiline={true}
          value={notesObject.notes}
          onChangeText={value =>
            SetnotesObject(prev => ({...prev, notes: value}))
          }
        />
      </View>

      <Button
        title="save"
        onPress={() => {
          saveButtonHandler();
        }}
      />
    </SafeAreaView>
  );
}

export default Home;
