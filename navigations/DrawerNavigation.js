import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import LogoutIcon from "../components/icons/Logout";

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ user, logOut }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerPosition="right"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Çıkış Yap"
              onPress={() => logOut()}
              icon={LogoutIcon}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Profile">
        {(props) => <Profile {...props} extraData={user} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
