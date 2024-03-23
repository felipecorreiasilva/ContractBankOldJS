import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_NULL } from '../context/actions/userActions';
import { Ionicons } from '@expo/vector-icons'
const Profile = ({navigation}) => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const handleLogout = async() => {
        
        await auth.signOut().then(() =>{
            dispatch(SET_USER_NULL())
            navigation.replace('Welcome')
        })
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={styles.close}
            >
            <Ionicons name="chevron-back-sharp" size={40} color="#7a7979" />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.9}
            style={styles.buttonLogout}
        >
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLogout:{
        
        
    }
})