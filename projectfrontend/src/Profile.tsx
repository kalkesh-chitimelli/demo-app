import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function Profile() {
  const [profile, Setprofile] = useState<any>([]);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const url = 'http://localhost:8080/users/login/userProfile';
    const axiosProfilePageCall = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(axiosProfilePageCall.data);
    Setprofile(axiosProfilePageCall.data);
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Text>User Details</Text>
        <Text>First Name: {profile.firstName}</Text>
        <Text>Last Name: {profile.lastName}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#f0e38d'},
  detailsContainer: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1cb',
  },
});

export default Profile;
