import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import Store from "./context/store";

import AuthNavigator from "./navigations/AuthNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <AuthNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});