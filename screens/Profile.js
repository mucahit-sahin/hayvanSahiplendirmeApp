import React from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import NewsCard from "../components/NewsCard";
import { firebase } from "../firebase/config";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = React.useState();
  const [savedNews, setSavedNews] = React.useState([]);

  React.useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase
        .database()
        .ref(`/users/${user.uid}`)
        .on("value", (snapshot) => {
          setUserData(snapshot.val());
        });
      firebase
        .database()
        .ref(`/users/${user.uid}/savedNews/`)
        .on("value", (snapshot) => {
          setSavedNews(Object.values(snapshot.val()));
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileRow}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Full Name</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text>{userData && userData.fullName}</Text>
          </View>
        </View>
        <View style={styles.profileRow}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Email</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text>{userData && userData.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.savedNews}>
        {savedNews && savedNews.length > 0 ? (
          <ScrollView>
            {savedNews.map((news) => (
              <NewsCard data={news} save={true} navigation={navigation} />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 0.7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Hiç kayıtlı haber yok</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: "#d7d7d8",
  },
  profileRow: {
    backgroundColor: "white",
    flexDirection: "row",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  savedNews: { flex: 0.7, backgroundColor: "white" },
});
