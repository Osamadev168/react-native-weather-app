import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Button,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Sunny, Cloudy, Rainy, Haze, Snow } from "./Images/Images.js";
import RBSheet from "react-native-raw-bottom-sheet";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Weather = ({ weatherdata, FetchWeatherData, navigation }) => {
  const [backgroundimage, setBackgroundImage] = useState(null);
  const [cityname, setCityName] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const {
    weather,
    name,
    main: { temp, humidty, pressure },
    wind: { speed },
  } = weatherdata;
  const [{ main, description }] = weather;
  const refRBSheet = useRef();
  useEffect(() => {
    FetchWeatherData(cityname);
    setBackgroundImage(getBackgroundImage(main));
  }, [weatherdata, refreshing]);
  let textColor = backgroundimage !== Sunny ? "white" : "black";
  function getBackgroundImage(weather) {
    if (weather === "Snow") return Snow;
    if (weather === "Clear") return Sunny;
    if (weather === "Rain") return Rainy;
    if (weather === "Clouds") return Cloudy;

    // return haze;
  }
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
              style={{ color: textColor, fontSize: 50, fontWeight: "normal" }}
            >
              {name}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 35, fontWeight: "normal" }}
            >
              {main}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 20, fontWeight: "normal" }}
            >
              {description}
            </Text>
            <Text
              style={{ color: textColor, fontSize: 30, fontWeight: "normal" }}
            >
              {Math.round(temp)} °C
            </Text>
          </View>
          <View>
            <Button
              onPress={() => refRBSheet.current.open()}
              title={"Search"}
              color={"white"}
              backgroundColor={"blue"}
            />
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View style={{ flex: 1, backgroundColor: "rgb(90, 90, 90)" }}>
              <View style={{ margin: 10 }}>
                <TextInput
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "rgb(210, 210, 210)",
                    borderRadius: 10,
                    fontSize: 20,
                    color: "white",
                  }}
                  onChangeText={(city) => setCityName(city)}
                />
              </View>
              <View
                style={{
                  backgroundColor: "black",
                  margin: 20,
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <Button
                  onPress={() => FetchWeatherData(cityname)}
                  title={"Get"}
                  color={"white"}
                  backgroundColor={"blue"}
                />
              </View>
            </View>
          </RBSheet>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
});
