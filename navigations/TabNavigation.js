import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import HomeIcon from "../components/Home";
import ProfileIcon from "../components/User";
import DrawerNavigation from "./DrawerNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <HomeIcon name="Home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={DrawerNavigation}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon name="Profile" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
