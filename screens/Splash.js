import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth, db } from '../services/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../context/actions/userActions'
import { LinearGradient } from "expo-linear-gradient"
import COLORS from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        checkLoggedUser()
    }, [])

    const checkLoggedUser = async() => {
        auth.onAuthStateChanged((userCred) => {
            
            if (userCred?.uid){
                getDoc(doc(db, 'users', userCred?.uid)).then(docSnap => {
                    if(docSnap.exists()){
                        // console.log("User Data :", docSnap.data())
                        dispatch(SET_USER(docSnap.data()))
                        
                    }
                }).then(() => {
                    setTimeout(() => {
                        navigation.replace("Home")
                    }, 2000)
                })
            }else {
                navigation.replace("Welcome")
            }
        })
    }
  return (
    <LinearGradient
    style={{
        flex: 1
    }}
    colors={[COLORS.secondary, COLORS.primary]}
    >

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Text style={{color: 'white'}} >Carregando...</Text>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>

    </LinearGradient>
    
  )
}

export default Splash

const styles = StyleSheet.create({})