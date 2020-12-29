import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NewsCard = ({ data }) => {
  function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds,
    };
  }
  return (
    <View style={styles.container}>
      <View style={styles.newsSite}>
        <View style={{ flex: 0.5 }}>
          <Text>{data.source.name}</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={{ textAlign: "right" }}>
            {convertMS(Date.parse(data.publishedAt)).hour + " saat önce"}
          </Text>
        </View>
      </View>
      <View style={styles.newsImage}>
        <Image
          style={{ height: 100, width: "100%" }}
          source={{
            uri: data.urlToImage,
          }}
        />
      </View>
      <View style={styles.newsTitle}>
        <Text style={{ fontWeight: "bold" }}>{data.title}</Text>
      </View>
      <View style={styles.newsDescription}>
        <Text>{data.description}</Text>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d7d7d8",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  newsSite: { flexDirection: "row", padding: 5 },
  newsImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newsTitle: { flexDirection: "row", padding: 5 },
  newsDescription: { flexDirection: "row", padding: 5 },
});
