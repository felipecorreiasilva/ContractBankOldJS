import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const ActionsKeysManage = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container} >
        
        <View style={styles.options} >
        
            
            <Entypo name="text-document" size={30} color="black" />
            <Text style={styles.text} >Endereço de CPF</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CpfKey")}>
            <AntDesign name="plus" size={30} color="#7a7979" />
            
            </TouchableOpacity>
            
        </View>
        
        <View style={styles.options} >
        
            
            <Entypo name="text-document" size={30} color="black" />
            <Text style={styles.text} >Endereço de Email</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CpfKey")}>
            <AntDesign name="plus" size={30} color="#7a7979" />
            
            </TouchableOpacity>
            
        </View>
        
        <View style={styles.options} >
        
            
            <Entypo name="text-document" size={30} color="black" />
            <Text style={styles.text} >Número de Celular</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CpfKey")}>
            <AntDesign name="plus" size={30} color="#7a7979" />
            
            </TouchableOpacity>
            
        </View>
        
        <View style={styles.options} >
        
            
            <Entypo name="text-document" size={30} color="black" />
            <Text style={styles.text} >Gerar chave Aleatória</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CpfKey")}>
            <AntDesign name="plus" size={30} color="#7a7979" />
            
            </TouchableOpacity>
            
        </View>
        
       
        
        
       

      
    </View>
  )
}

export default ActionsKeysManage

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        marginStart: 35,
        marginEnd: 20
        
    },
    options:{
        marginTop: 25,
        marginRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text:{
        fontWeight: 'bold',
        fontSize: 15
        
    }
})