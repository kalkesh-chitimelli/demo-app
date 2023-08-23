import React from 'react';
import {ScrollView, Text} from 'react-native';

function Note({navigation, route}: any) {
  return (
    <ScrollView>
      <Text>{route.params.note}</Text>
    </ScrollView>
  );
}

export default Note;
