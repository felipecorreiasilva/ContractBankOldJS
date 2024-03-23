import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Login, SignUp, Welcome, Splash, Dashboard, Home, Profile, AreaPix, CpfKey, KeysManage } from "../screens";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        
        <Drawer.Screen
        name='CpfKey'
        component={CpfKey}
        options={{
            headerShown: false,
        }}
        >

        </Drawer.Screen>
        
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})