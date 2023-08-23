import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function EditnoteModal(props: any) {
  const [note, Setnote] = useState<any>();
  const editButtonHandler = async () => {
    const url = 'http://localhost:8080/notes/updateNote';
    const editResult = await axios.put(
      url,
      {note: note},
      {
        headers: {
          Authorization: `Bearer ${props.tokenUse}`,
          param: props.editItem.title,
        },
      },
    );
    Alert.alert(editResult.data);
    props.SeteditModal(false);
  };
  return (
    <Modal
      visible={props.editModal}
      onShow={() => Setnote(props.editItem.note)}>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.editTitleTextContainer}>
          <Text style={styles.editTitleText}>{props.editItem.title}</Text>
        </View>
        <View style={styles.editNoteTextInputContainer}>
          <TextInput
            placeholder="Add Notes"
            multiline={true}
            value={note}
            onChangeText={value => Setnote(value)}
          />
        </View>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              editButtonHandler();
            }}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  editNoteTextInputContainer: {
    backgroundColor: '#f7f1cb',
    flex: 8,
  },
  editTitleTextContainer: {
    flex: 1,
    backgroundColor: '#e6c510',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTitleText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  editButton: {
    borderWidth: 1,
    width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#e6c510',
  },
  editButtonContainer: {
    flex: 1,
    backgroundColor: '#f0e38d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {fontSize: 25, color: 'white'},
});

export default EditnoteModal;
