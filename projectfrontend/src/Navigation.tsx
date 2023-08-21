import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import DrawerNavigation from './DrawerNavigation';
import Viewnotes from './Viewnotes';

function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'demo-app'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'demo-app'}}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{title: 'demo-app'}}
        />
        <Stack.Screen
          name="Viewnotes"
          component={Viewnotes}
          options={{title: 'demo-app'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
