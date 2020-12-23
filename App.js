import React from "react";
import { StatusBar } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Register />
    </>
  );
}
