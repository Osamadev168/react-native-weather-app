import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Sunny, Cloudy, Rainy, Haze, Snow } from "./Images/Images.js";
import RBSheet from "react-native-raw-bottom-sheet";
import SearchWeather from "./SearchWeather.js";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const LocationWeather = ({ weatherdata, navigation, FetchWeatherData }) => {
  const [backgroundimage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidty, pressure },
    wind: { speed },
  } = weatherdata;
  const [{ main, description }] = weather;

  useEffect(() => {
    FetchWeatherData();
    setBackgroundImage(getBackgroundImage(main));
  }, [weatherdata, refreshing]);
  function getBackgroundImage(weather) {
    if (weather === "Snow") return Snow;
    if (weather === "Clear") return Sunny;
    if (weather === "Rain") return Rainy;
    if (weather === "Clouds") return Haze;
    // return haze;
  }
  let textColor = backgroundimage !== Sunny ? "white" : "black";
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground
          source={backgroundimage}
          style={styles.backgroundImg}
          resizeMode="cover"
        >
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Text
              style={{ color: textColor, fontSize: 40, fontWeight: "normal" }}
            >
              {name}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 30, fontWeight: "normal" }}
            >
              {main}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 33, fontWeight: "normal" }}
            >
              {description}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 30, fontWeight: "normal" }}
            >
              {Math.round(temp)} °C
            </Text>
            <Button
              title="Search "
              onPress={() => navigation.navigate("Search")}
              color={"white"}
              style={{ marginTop: 200 }}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default LocationWeather;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
});
