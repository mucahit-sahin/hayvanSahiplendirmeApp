import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Picker,
} from "react-native";
import NewsCard from "../components/NewsCard";
import api from "../services/api";
import countryList from "../country.json";
import categoryList from "../category.json";

const API_KEY = "f837f9fbc3714d709677a8b923bb34ed";

const Home = (props) => {
  const userID = props.extraData.id;
  const [newsList, setNewsList] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [country, setCountry] = React.useState("Türkiye");
  const [selectedCountry, setSelectedCountry] = React.useState("Türkiye");
  const [selectedCategory, setSelectedCategory] = React.useState("general");

  React.useEffect(() => {
    refreshList();
  }, []);
  React.useEffect(() => {
    setNewsList(newsList.reverse());
  }, [newsList]);

  const refreshList = async () => {
    setRefresh(true);
    setNewsList([]);
    await api
      .get(
        `top-headlines?country=${selectedCountry}&category=${selectedCategory}&apiKey=${API_KEY}`
      )
      .then((response) => {
        setNewsList(response.data.articles);
      });
    setRefresh(false);
  };
  const countryChange = () => {
    setCountry(selectedCountry);
    countryList.map((country) => {
      if (country.name == selectedCountry) {
        setSelectedCountry(country.code);
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsFilter(true)}>
          <Text style={{ fontSize: 20 }}>
            {country} {selectedCategory} News
          </Text>
        </TouchableOpacity>
      </View>
      {newsList && (
        <View style={styles.newsList}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={refreshList} />
            }
          >
            {newsList.map((news) => (
              <NewsCard data={news} />
            ))}
          </ScrollView>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilter}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formRow}>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.label}>Ülke:</Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <Picker
                  selectedValue={selectedCountry}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setSelectedCountry(itemValue);
                  }}
                >
                  {countryList.map((country) => (
                    <Picker.Item
                      label={country.name}
                      value={country.name}
                      key={country.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.label}>Category:</Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setSelectedCategory(itemValue);
                  }}
                >
                  {categoryList.map((category) => (
                    <Picker.Item
                      label={category.name}
                      value={category.name}
                      key={category.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => {
                  countryChange();
                  setIsFilter(false);
                }}
              >
                <Text>Degistir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d7d8",
  },
  header: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d7d7d8",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  newsList: {
    flex: 0.9,
    margin: 5,
    borderRadius: 30,
    padding: 5,
  },
  centeredView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(100,100,100, 0.5)",
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 5,
    backgroundColor: "#d7d7d8",
    borderRadius: 15,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  changeButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
});
