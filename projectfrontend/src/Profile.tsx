import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

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
    <SafeAreaView>
      <Text>Profile</Text>
      <Text>First Name: {profile.firstName}</Text>
      <Text>Last Name: {profile.lastName}</Text>
    </SafeAreaView>
  );
}

export default Profile;
