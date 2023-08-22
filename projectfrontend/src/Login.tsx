/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Login({navigation}: any) {
  const [email, Setemail] = useState<string>('');
  const [password, Setpassword] = useState<string>('');
  const [securePassword, SetsecurePassword] = useState<boolean>(true);
  const [passImage, SetPassImage] = useState<string>(
    'https://t4.ftcdn.net/jpg/05/64/24/57/240_F_564245738_zSKK2bGehSiIeMgcHrP1PZ4PTX7YPQHP.jpg',
  );
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
  const gotoRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Resume to Notes!!!</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'grey'}
          onChangeText={Setemail}
          autoCorrect={false}
          style={styles.textInput}
        />
        <View style={styles.passwordContainer}>
          <View style={{width: '90%'}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'grey'}
              onChangeText={Setpassword}
              autoCorrect={false}
              secureTextEntry={securePassword}
            />
          </View>
          <View>
            <TouchableOpacity
              onPressIn={() => {
                securePassword
                  ? SetsecurePassword(false)
                  : SetsecurePassword(true);
                securePassword
                  ? SetPassImage(
                      'https://t3.ftcdn.net/jpg/05/91/81/98/240_F_591819809_wksHqTRilqCSqCRAhNQpEGGHrkwlKAki.jpg',
                    )
                  : SetPassImage(
                      'https://t4.ftcdn.net/jpg/05/64/24/57/240_F_564245738_zSKK2bGehSiIeMgcHrP1PZ4PTX7YPQHP.jpg',
                    );
              }}>
              <Image
                source={{
                  uri: passImage,
                }}
                style={styles.passwordImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Login"
          onPress={() => {
            next();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            gotoRegister();
          }}>
          <Text style={{fontSize: 12}}>new to Notes?Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e38d',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 5,
    margin: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: '#f7f1cb',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#f7f1cb',
  },
  passwordImage: {
    height: 22,
    width: 22,
  },
  titleText: {
    color: '#42423c',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  titleTextContainer: {
    marginTop: 10,
  },
});

export default Login;
