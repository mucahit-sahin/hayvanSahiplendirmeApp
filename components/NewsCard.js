import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../firebase/config";
import { convertMS } from "../utils/convertMS";

const NewsCard = ({ data, navigation, save }) => {
  const user = firebase.auth().currentUser;
  const regex = /\./gi;

  const saveNews = () => {
    var name = data.source.name;
    name = name.replace(regex, "-");
    firebase
      .database()
      .ref(`users/${user.uid}/savedNews/${name + data.publishedAt}`)
      .set(data);
    Alert.alert("Başarılı", "Haber başarılı bir şekilde kaydedildi");
  };
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

      {save ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { link: data.url })}
          >
            <Text>Siteye git</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { link: data.url })}
            >
              <Text>Siteye Git</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => saveNews()}>
              <Text>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flex: 0.5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
});
