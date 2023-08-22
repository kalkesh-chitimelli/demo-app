import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function Home({navigation}: any) {
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
    Alert.alert(result);
  };

  useEffect(() => {
    getTokenEmail();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 9}}>
        <TextInput
          placeholder="Add Title(Max Length 25)"
          maxLength={25}
          style={styles.addTitleTextInput}
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
          style={styles.addNoteTextInput}
        />
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            saveButtonHandler();
          }}
          style={styles.saveButton}>
          <Text style={styles.buttonText}>save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#e6c510',
  },
  saveButtonContainer: {
    flex: 1,
    backgroundColor: '#f0e38d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNoteTextInput: {
    backgroundColor: '#f7f1cb',
    height: '100%',
    width: '100%',
  },
  addTitleTextInput: {
    borderBottomWidth: 2,
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#f7f1cb',
  },
  buttonText: {fontSize: 25, color: 'white'},
});

export default Home;
