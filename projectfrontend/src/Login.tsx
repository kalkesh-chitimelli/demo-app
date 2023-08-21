/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Login({navigation}: any) {
  const [email, Setemail] = useState<string>('');
  const [password, Setpassword] = useState<string>('');
  const [securePassword, SetsecurePassword] = useState<boolean>(true);
  const url = 'http://localhost:8080/users/login';
  const next = async () => {
    const res = await axios.post(url, {
      email: email,
      password: password,
    });

    if (res.data === 'Kindly check your username/password and try again...') {
      console.log(res.data);
      Alert.alert(res.data);
    } else {
      //console.log(res.data);
      Alert.alert(res.data.message);
      //console.log(res.data.token);
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('email', email);
      navigation.navigate('DrawerNavigation');
    }
  };
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'grey'}
          onChangeText={Setemail}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'grey'}
          onChangeText={Setpassword}
          autoCorrect={false}
          secureTextEntry={securePassword}
        />
        <TouchableOpacity
          onPressIn={() => {
            securePassword ? SetsecurePassword(false) : SetsecurePassword(true);
          }}>
          <Text style={{fontSize: 12}}>Show Password</Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={() => {
            next();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Login;
