import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './Register';
import Login from './Login';
import DrawerNavigation from './DrawerNavigation';
import Note from './Note';

function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#e6c510'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{title: 'demo-app', headerShown: false}}
        />
        <Stack.Screen
          name="Note"
          options={({route}: any) => ({title: route.params.title})}
          component={Note}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
