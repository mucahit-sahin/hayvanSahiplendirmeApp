import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import { firebase } from "../firebase/config";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const onRegisterPress = async () => {
    if (
      !email.trim() &&
      !fullName.trim() &&
      !password.trim() &&
      !confirmPassword.trim()
    ) {
      alert("Lütfen alanları boş bırakmayın");
      return;
    }
    if (password !== confirmPassword) {
      alert("Parolalar eşlenmiyor");
      return;
    }
    const createToken = await Notifications.getExpoPushTokenAsync();

    console.log(createToken);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email: email,
          fullName: fullName,
          expoToken: createToken.data,
        };
        firebase.database().ref(`users/${uid}`).set(data);
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
          style={styles.inputText}
          placeholder="Full Name..."
          placeholderTextColor="white"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
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
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="white"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => onRegisterPress()}
      >
        <Text style={styles.loginText}>SIGNUP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

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
