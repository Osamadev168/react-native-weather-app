import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Weather from "./OtherCityWeather";

const SearchWeather = ({ navigation }) => {
  const [weatherdata, setWeatherData] = useState(null);

  const FetchWeatherData = async (cityname) => {
    const API_Key = "6c74e4d8f0a73dd8457bbf342ce9f8a5";
    const API_Call = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${API_Key}`;

    const response = await fetch(API_Call);

    const data = await response.json();

    {
      response.status == 200 ? setWeatherData(data) : <View></View>;
    }
  };

  useEffect(() => {
    FetchWeatherData("Dubai");
  }, []);
  if (weatherdata === null) {
    return (
      <View>
        <Text>Fetching Weather Data....</Text>
        <ActivityIndicator color={"blue"}></ActivityIndicator>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Weather
        weatherdata={weatherdata}
        FetchWeatherData={FetchWeatherData}
        navigation={navigation}
      />
    </View>
  );
};

export default SearchWeather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
