import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { firebase } from "../firebase/config";
import * as Notifications from "expo-notifications";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onLoginPress = async () => {
    if (!email.trim() && !password.trim()) {
      alert("Lütfen alanları boş bırakmayın");
      return;
    }
    const createToken = await Notifications.getExpoPushTokenAsync();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        firebase
          .database()
          .ref(`/users/${uid}`)
          .on("value", (snapshot) => {
            if (snapshot.val()) {
              firebase
                .database()
                .ref(`users/${uid}`)
                .update({
                  expoToken: createToken.data,
                })
                .then(() => console.log("Data updated."));
            }
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="white"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => onLoginPress()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 100, height: 100, marginBottom: 10 },
  logoText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffc715",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#8ee000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
