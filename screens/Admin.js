import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { firebase } from "../firebase/config";

const Admin = ({ logOut }) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const sendAllUserNotification = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Lütfen alanları boş bırakmayın");
      return;
    }
    const users = await firebase
      .database()
      .ref("/users")
      .orderByChild("expoToken");
    //console.log(users);
    // users.map((user) => sendPushNotification(user.data().token));
    console.log("--");

    users.once("value").then((snapshot) => {
      let data;
      snapshot.forEach((childSub) => {
        let childData = childSub.val();
        data = childData.expoToken;
        console.log(data);
        sendPushNotification(data);
      });
    });
    alert("Success");
    setTitle("");
    setBody("");
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text>Admin Paneli</Text>
      </View>
      <View style={styles.inputRow}>
        <View style={{ flex: 1, backgroundColor: "white", borderRadius: 10 }}>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Notification Title"
          />
        </View>
      </View>
      <View style={styles.inputRow}>
        <View style={{ flex: 1, backgroundColor: "white", borderRadius: 10 }}>
          <TextInput
            value={body}
            onChangeText={(text) => setBody(text)}
            placeholder="Notification Body"
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => sendAllUserNotification()}
        >
          <Text>Send All User Notification.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logOut()}>
          <Text>Logout.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d7d7d8",
  },
  button: {
    backgroundColor: "#00bce4",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
});
