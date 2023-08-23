import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EditnoteModal from './EditnoteModal';

function Viewnotes({navigation}: any) {
  const [notes, Setnotes] = useState<any>([]);
  const [tokenUse, SettokenUse] = useState<any>();
  const [editModal, SeteditModal] = useState<Boolean>(false);
  const [editItem, SeteditItem] = useState<any>({});

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    SettokenUse(token);
    const url = 'http://localhost:8080/notes/viewNotes';
    const axiosNotesPageCall = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(axiosNotesPageCall.data);
    Setnotes(axiosNotesPageCall.data);
  };

  const viewNoteHandler = ({item}: any) => {
    navigation.navigate('Note', {title: item.title, note: item.notes});
  };

  const deleteButtonHandler = ({item}: any) => {
    Alert.alert('Delete', 'Are You Sure To Delete', [
      {
        text: 'OK',
        onPress: async () => {
          console.log('OK Pressed');
          const url = 'http://localhost:8080/notes/deleteNote';
          const deleteResult = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${tokenUse}`,
              param: item.title,
            },
          });
          Alert.alert(deleteResult.data);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };
  const editButtonHandler = ({item}: any) => {
    SeteditModal(true);
    SeteditItem({title: item.title, note: item.notes});
  };
  useEffect(() => {
    getToken();
  }, [notes, deleteButtonHandler]);
  return (
    <SafeAreaView style={styles.mainContainer}>
      {notes.length === 0 ? (
        <View style={styles.saveButtonContainer}>
          <Text>Your Notes is Empty</Text>
          <Text>Click below to Add New-Note</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              navigation.navigate('New-Note');
            }}>
            <Text style={styles.buttonText}>Add-New</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={notes}
            renderItem={({item}) => {
              return (
                <View style={styles.flatlistContainer}>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          viewNoteHandler({item});
                        }}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/1666/1666578.png',
                          }}
                          style={{height: 30, width: 30}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          editButtonHandler({item});
                        }}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/1001/1001371.png',
                          }}
                          style={{height: 30, width: 30}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          deleteButtonHandler({item});
                        }}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/10735/10735264.png',
                          }}
                          style={{height: 30, width: 32}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <EditnoteModal
            editModal={editModal}
            SeteditModal={SeteditModal}
            editItem={editItem}
            SeteditItem={SeteditItem}
            tokenUse={tokenUse}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#f0e38d'},
  flatlistContainer: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#f7f1cb',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonContainer: {
    flex: 1,
    backgroundColor: '#f0e38d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {fontSize: 25, color: 'white'},
  saveButton: {
    borderWidth: 1,
    width: 150,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#e6c510',
  },
});

export default Viewnotes;
