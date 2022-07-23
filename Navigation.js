import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurentWeather from "./CurrentWeather";
import Weather from "./OtherCityWeather";
import SearchWeather from "./SearchWeather";
import CurrentWeather from "./CurrentWeather";
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={CurrentWeather}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={CurentWeather} />
        <Stack.Screen name="Search" component={SearchWeather} />

        <Stack.Screen name="city" component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
