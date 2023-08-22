/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './Profile';
import Home from './Home';
import Viewnotes from './Viewnotes';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}: any) {
  return (
    <Drawer.Navigator
      initialRouteName="Viewnotes"
      useLegacyImplementation={false}
      screenOptions={{
        headerStyle: {backgroundColor: '#e6c510'},
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        ),
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#e6c510',
        drawerActiveBackgroundColor: '#f7f1cb',
        drawerContentStyle: {backgroundColor: '#e6c510'},
      }}>
      <Drawer.Screen name="Notes" component={Viewnotes} />
      <Drawer.Screen name="New-Note" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  logoutButton: {
    borderWidth: 1,
    width: 70,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f0e38d',
    backgroundColor: '#f7f1cb',
    marginRight: 5,
  },
  logoutButtonText: {fontSize: 20, color: '#e6c510'},
});

export default DrawerNavigation;
