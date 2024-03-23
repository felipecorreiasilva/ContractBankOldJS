import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, {useRef, useMemo} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ActionsAreaPix from '../components/ActionsAreaPix'
import { useSelector } from 'react-redux'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {BottomSheetModal, BottomSheetView, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import { EvilIcons, AntDesign, Entypo } from '@expo/vector-icons'
import ActionsKeysManage from '../components/ActionsKeysManage'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64

const AreaPix = ({navigation}) => {
    
    const bottomSheetref = useRef(null)
    const snapPoints = useMemo(()=> ["40%"], [])
    const user = useSelector(state => state.user.user)
    const handleCloseAction = () => bottomSheetref.current?.close()
    const handleOpenPress = () => bottomSheetref.current?.present();

  return (

    <GestureHandlerRootView style={{flex:1}} >
        
        <View
        style={styles.container}
        >
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={styles.close}
            >
            <EvilIcons name="close" size={40} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.title} >Área Pix</Text>                  
            <Text style={{fontSize: 22, color: '#7a7979'}} >Envie e receba pagamentos a qualquer hora e dia da semana.</Text>
            <ActionsAreaPix/>
            <Text style={{color: '#7a7979', fontWeight: 'bold', fontSize: 15, marginTop: 15}} >Preferências</Text>

            <TouchableOpacity style={styles.options} onPress={handleOpenPress} >
            <Entypo name="text-document" size={30} color="black" />
                <Text style={styles.text} >Registrar ou trazer chaves</Text>
                
                
            </TouchableOpacity>
                
            <TouchableOpacity style={styles.options} onPress={handleOpenPress} >
            <Entypo name="text-document" size={30} color="black" />
                <Text style={styles.text} >Configurar Pix</Text>      
            </TouchableOpacity>
    
    
    
            
                
        
                
            
            

        </View>

        <BottomSheetModalProvider>
        <BottomSheetModal
        
        ref={bottomSheetref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#fff'}}    
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        >
        <TouchableOpacity
        onPress={handleCloseAction}
        style={{marginStart: 30, position: 'absolute'}}
        >
        <EvilIcons name="close" size={40} color="black" />
        </TouchableOpacity>
        <ActionsKeysManage/>
      </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    
  )
}

export default AreaPix

const styles = StyleSheet.create({
    container:{
        
        marginStart: 'auto',
        marginEnd: 'auto',
        marginVertical: 20
        
    },
    title:{
        fontSize: 50,
        marginTop: 70,
        marginBottom: 10
    },
    options:{
        
        alignItems: 'center',
        flexDirection: 'row',         
        borderBottomWidth: 3,
        borderBottomColor: '#dadada',
        paddingTop: 20,
        paddingBottom: 20
        

    },
    text:{
        paddingLeft: 40,
        fontSize: 15,
        fontWeight: 'bold',

    },
    close: {
        marginVertical: 20,
        position: 'absolute'
    },
    

})