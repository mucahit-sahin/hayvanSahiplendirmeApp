import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import HomeIcon from "../components/Home";
import ProfileIcon from "../components/User";
import DrawerNavigation from "./DrawerNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ user, logOut }) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <HomeIcon name="Home" color={color} size={size} />
            ),
          }}
        >
          {(props) => <Home {...props} extraData={user} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon name="Profile" color={color} size={size} />
            ),
          }}
        >
          {(props) => (
            <DrawerNavigation {...props} extraData={user} logOut={logOut} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
