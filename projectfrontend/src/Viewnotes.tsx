import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

function Viewnotes({navigation}: any) {
  const [notes, Setnotes] = useState<any>([]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const url = 'http://localhost:8080/notes/viewNotes';
    const axiosNotesPageCall = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(axiosNotesPageCall.data);
    Setnotes(axiosNotesPageCall.data);
  };
  useEffect(() => {
    getToken();
  }, [notes]);

  const viewNoteHandler = ({item}: any) => {
    navigation.navigate('Note', {title: item.title, note: item.notes});
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
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
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1001/1001371.png',
                      }}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
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
});

export default Viewnotes;
