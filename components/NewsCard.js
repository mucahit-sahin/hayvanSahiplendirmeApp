import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { convertMS } from "../utils/convertMS";

const NewsCard = ({ data }) => {
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
