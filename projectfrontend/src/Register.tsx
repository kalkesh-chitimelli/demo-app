/* eslint-disable react-native/no-inline-styles */
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

function Register({navigation}: any) {
  const [firstName, SetfirstName] = useState<string>('');
  const [lastName, SetlastName] = useState<string>('');
  const [email, Setemail] = useState<string>('');
  const [password, Setpassword] = useState<string>('');
  const [securePassword, SetsecurePassword] = useState<boolean>(true);
  const url = 'http://localhost:8080/users/register';
  const next = async () => {
    try {
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== ''
      ) {
        const res = await axios.post(url, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        if (res.data === 'Registartion is Failed...') {
          console.log(res.data);
          Alert.alert(res.data);
        } else {
          console.log(res.data);
          Alert.alert(res.data);
          navigation.navigate('Login');
        }
      } else {
        console.log('Registartion is Failed...');
        Alert.alert('Registartion is Failed...');
      }
    } catch (e) {
      return e;
    }
  };
  const gotoLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="FirstName"
          placeholderTextColor={'grey'}
          onChangeText={SetfirstName}
          autoCorrect={false}
        />
        <TextInput
          placeholder="LastName"
          placeholderTextColor={'grey'}
          onChangeText={SetlastName}
          autoCorrect={false}
        />
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
          title="Register"
          onPress={() => {
            next();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            gotoLogin();
          }}>
          <Text style={{fontSize: 12}}>Already a user?Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Register;
