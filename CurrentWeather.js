import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Weather from "./OtherCityWeather";
import * as Location from "expo-location";
import { Sunny, Cloudy, Rainy, Haze, Snow } from "./Images/Images.js";
import LocationWeather from "./LiveLocationWeather";
export default function CurrentWeather({ navigation }) {
  const API_Key = "6c74e4d8f0a73dd8457bbf342ce9f8a5";
  const [weatherdata, setWeatherData] = useState(null);
  const [backgroundimage, setBackgroundImage] = useState(null);

  const FetchWeatherData = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert(
          "Insufficient permissions!",
          "Sorry, we need location permissions to make this work!"[
            { text: "Okay" }
          ]
        );
        return;
      }
    }
    const location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;

    const lon = location.coords.longitude;

    const API_Call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_Key}`;

    const response = await fetch(API_Call);

    const data = await response.json();

    {
      response.status == 200 ? setWeatherData(data) : <View></View>;
    }
  };

  useEffect(() => {
    FetchWeatherData();
    console.log(weatherdata);
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
      <LocationWeather
        weatherdata={weatherdata}
        FetchWeatherData={FetchWeatherData}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
