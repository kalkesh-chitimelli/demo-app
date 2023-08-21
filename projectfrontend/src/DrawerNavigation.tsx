/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './Profile';
import Home from './Home';
import Viewnotes from './Viewnotes';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      useLegacyImplementation={false}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="View-notes" component={Viewnotes} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
