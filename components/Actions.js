import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const Actions = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >

    <TouchableOpacity onPress={()=>navigation.navigate("AreaPix")} style={styles.actionButton} >
        <View style={styles.areaButton} >
            <FontAwesome6 name="pix" size={24} color="black" />
        </View>
        <Text style={styles.labelButton}>Área Pix</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
        <FontAwesome6 name="barcode" size={24} color="black" />
        </View>
        <Text style={styles.labelButton}>Pagar</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate("ValueTransferPix")} style={styles.actionButton} >
        <View style={styles.areaButton} >
        <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
        </View>
        <Text style={styles.labelButton}>Transferir</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='addfolder' size={26} color='#000' />
        </View>
        <Text style={styles.labelButton}>Entradas</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='tagso' size={26} color='#000' />
        </View>
        <Text style={styles.labelButton}>Compras</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='creditcard' size={26} color='#000' />
        </View>
        <Text style={styles.labelButton}>Carteira</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=>navigation.navigate("Profile")} style={styles.actionButton} >
        <View style={styles.areaButton} >
            <AntDesign name='setting' size={26} color='#000' />
        </View>
        <Text style={styles.labelButton}>Conta</Text>
    </TouchableOpacity>

    </ScrollView>
  )
}

export default Actions

const styles = StyleSheet.create({
    container:{
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton:{
        alignItems: 'center',
        marginRight: 32

    },
    areaButton:{
        backgroundColor: '#ecf0f1',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton:{
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})