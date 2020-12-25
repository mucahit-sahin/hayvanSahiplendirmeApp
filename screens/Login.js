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

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onLoginPress = () => {
    if (!email.trim() && !password.trim()) {
      alert("Lütfen alanları boş bırakmayın");
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("Mail ve şifreyi tekrar kontrol ediniz!");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user: user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.logoText}>Yol Arkadaşım</Text>
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
  logo: { width: 100, height: 100 },
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
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
