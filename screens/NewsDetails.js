import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const NewsDetails = ({ route }) => {
  const link = route.params.link;
  return (
    <WebView
      source={{
        uri: link,
      }}
      style={{ flex: 1 }}
    />
  );
};

export default NewsDetails;

const styles = StyleSheet.create({});
