import React from "react";
import { StatusBar } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Login />
    </>
  );
}
