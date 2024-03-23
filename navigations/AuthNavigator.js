import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Login,
  SignUp,
  Welcome,
  Splash,
  Dashboard,
  Home,
  Profile,
  AreaPix,
  CpfKey,
  ValueTransferPix,
  NewTransferPix,
  ToTransferPix,
  CompletedTransferPix,
  VoucherTransferPix,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AreaPix"
        component={AreaPix}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="CpfKey"
        component={CpfKey}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="ValueTransferPix"
        component={ValueTransferPix}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="NewTransferPix"
        component={NewTransferPix}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="ToTransferPix"
        component={ToTransferPix}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="CompletedTransferPix"
        component={CompletedTransferPix}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
