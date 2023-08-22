/* eslint-disable react-native/no-inline-styles */
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

function Register({navigation}: any) {
  const [firstName, SetfirstName] = useState<string>('');
  const [lastName, SetlastName] = useState<string>('');
  const [email, Setemail] = useState<string>('');
  const [password, Setpassword] = useState<string>('');
  const [securePassword, SetsecurePassword] = useState<boolean>(true);
  const [passImage, SetPassImage] = useState<string>(
    'https://t4.ftcdn.net/jpg/05/64/24/57/240_F_564245738_zSKK2bGehSiIeMgcHrP1PZ4PTX7YPQHP.jpg',
  );
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Begin Your Journey Here!!!</Text>
      </View>
      <View style={styles.regContainer}>
        <TextInput
          placeholder="FirstName"
          placeholderTextColor={'grey'}
          onChangeText={SetfirstName}
          autoCorrect={false}
          style={styles.textInput}
        />
        <TextInput
          placeholder="LastName"
          placeholderTextColor={'grey'}
          onChangeText={SetlastName}
          autoCorrect={false}
          style={styles.textInput}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e38d',
  },
  regContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 5,
    margin: 20,
  },
  passwordImage: {
    height: 22,
    width: 22,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#f7f1cb',
  },
  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: '#f7f1cb',
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

export default Register;
