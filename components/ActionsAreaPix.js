import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64
const ActionsAreaPix = () => {
    const navigation = useNavigation();
  return (
    <View>
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >
    
    <TouchableOpacity onPress={()=>navigation.navigate("ValueTransferPix")} style={styles.actionButton} >
        <View style={styles.areaButton} >
        <FontAwesome6 name="money-bill-transfer" size={30} color="black" />
        </View>
        <Text style={styles.labelButton}>Transferir</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
        <FontAwesome6 name="barcode" size={30} color="black" />
        </View>
        <Text style={styles.labelButton}>Pagar</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='addfolder' size={30} color='#000' />
        </View>
        <Text style={styles.labelButton}>Entradas</Text>
    </TouchableOpacity>

    </ScrollView>

    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='tagso' size={30} color='#000' />
        </View>
        <Text style={styles.labelButton}>Compras</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='creditcard' size={30} color='#000' />
        </View>
        <Text style={styles.labelButton}>Carteira</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='setting' size={30} color='#000' />
        </View>
        <Text style={styles.labelButton}>Conta</Text>
    </TouchableOpacity>
    
    </ScrollView>

    <View style={styles.borderBottom}>

    </View>
    
    </View>
    
  )
}

export default ActionsAreaPix

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        maxHeight: 84,
        marginBottom: 14,  
        marginEnd: 'auto',
        marginStart: 'auto',


    },
    actionButton:{
        alignItems: 'center',
        marginRight: 32

    },
    areaButton:{
        backgroundColor: '#ecf0f1',
        height: 65,
        width: 65,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton:{
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    borderBottom:{
        paddingVertical: 16,
        borderBottomWidth: 5,
        borderBottomColor: '#dadada',
    }
    
})