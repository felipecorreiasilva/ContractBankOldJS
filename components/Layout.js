import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'


const Layout = ({Children}) => {
  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={250}
    style={{flex: 1}}
    behavior={Platform.select({android: 'height', ios: 'padding'})}
    >
        {Children}
    </KeyboardAvoidingView>
  )
}

export default Layout

const styles = StyleSheet.create({})