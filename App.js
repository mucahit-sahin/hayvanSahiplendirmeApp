import React from "react";
import { StatusBar } from "react-native";
import AuthNavigation from "./navigations/AuthNavigation";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AuthNavigation />
    </>
  );
}
