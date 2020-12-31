import React from "react";
import { StatusBar } from "react-native";
import AuthNavigation from "./navigations/AuthNavigation";
import Routes from "./navigations/Routes";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}
