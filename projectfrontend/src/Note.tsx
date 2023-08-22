import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

function Note({navigation, route}: any) {
  return (
    <ScrollView>
      <Text>{route.params.note}</Text>
    </ScrollView>
  );
}

export default Note;
