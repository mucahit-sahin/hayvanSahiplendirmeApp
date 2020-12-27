import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import { firebase } from "../firebase/config";

const Drawer = createDrawerNavigator();
const DrawerNavigation = ({ signOut }) => {
  return (
    <Drawer.Navigator initialRouteName="Profile" drawerPosition="right">
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
