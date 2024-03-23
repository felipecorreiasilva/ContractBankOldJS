import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import COLORS from '../constants/colors'
import { AntDesign, Ionicons, EvilIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { db } from '../services/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { SET_USER } from '../context/actions/userActions'
import { BlurView } from 'expo-blur';
import { ScrollView } from 'moti';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
const {abi} = require("../artifacts/contracts/MyToken.sol/MyToken.json")
const CONTRACT_ADDRESS = '0x8eBb8D7007dd9Bfa469766043F57086261C7dA81'

const ValueTransferPix = ({ navigation }) => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [maskTransferPix, setMaskTransferPix] = useState(0)
    const [valueTransferPix, setValueTransferPix] = useState(0)
    const [userDb, setUserDb] = useState({})
    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [etherBalance, setEtherBalance] = useState(0)
    
    const currencyFormatter = (lang, currency, balance)=> Intl.NumberFormat(lang,{
        
        style: "currency",
        maximumFractionDigits: 2,
        currency,

    }).format(balance)

    async function handleValueTransferPix() {
        const valueTransferPixRef = doc(db, 'users', user.id);
        console.log('kakaka1', (Number(etherBalance) / 10e9))
        console.log('kakaka2', valueTransferPix)
        
        if (valueTransferPix != 0 && valueTransferPix <= (Number(etherBalance) / 10e9)){

            await setDoc(valueTransferPixRef, { valueTransferPix }, { merge: true }).then(()=>{
                
                dispatch(SET_USER({...userDb, valueTransferPix}))
                
                navigation.navigate('NewTransferPix') 
            }).catch((err)=>{
                console.log('error: ', err)
            })
  
                    

        }
        
        else {
            alert('Você não tem saldo suficiente!')
            
        }
        
     
        
    }

    useEffect(() => {
        const handleGetData = async() =>{
            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                const data = docSnap.data()
                setUserDb({...data})
                dispatch(SET_USER({...data}))

                const api = 'api da infura'
                const provider = new ethers.getDefaultProvider(api)
                const signer = new ethers.Wallet(user.privateKey, provider)
                const cMyToken = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
                // const balance = await provider.getBalance(user.addressWallet)
                const balance = await cMyToken.balanceOf(user.addressWallet)
                // console.log('aquiiii', balance)
                setEtherBalance(balance)

              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        handleGetData()
        
    }, [])

    useEffect(() =>{
        Keyboard.addListener("keyboardDidShow", () => {
            setButtonsVisible(true)
        })

        Keyboard.addListener("keyboardDidHide", () => {
            setButtonsVisible(false)
        })
    })

  return (
    
    <KeyboardAvoidingView
        keyboardVerticalOffset={25}
        style={styles.container}
        behavior={Platform.select({android: 'height', ios: 'padding'})}
        >
            
    <View>
        <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={styles.close}
            >
            <EvilIcons name="close" size={40} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>Qual é o valor da transferência?</Text>
      <Text style={styles.label}>saldo disponivel em conta {currencyFormatter("pt-BR", "BRL", (Number(etherBalance) / 10e11))}</Text>
      {/* <Text style={styles.label}>saldo disponivel em conta {Number(etherBalance) / 10e12}</Text> */}

        <TextInputMask
        
        style={styles.textInput}
        type={'money'}
        value={maskTransferPix}
        placeholderTextColor="#C0C0C0"
        onChangeText={text => {
            setMaskTransferPix(text)
            text = text.replace('R$', '')
            text = text.replace('.', '')
            text = text.replace(',', '')
            setValueTransferPix(text)

        }}
        
        />
        {buttonsVisible ?(
            
                (valueTransferPix == 0) ? (
                    <View>
                <TouchableOpacity style={styles.button} >
                    <View style={styles.areaButtonBlock} >
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                </View>) 
                : 
                (
                    <View>
                <TouchableOpacity onPress={handleValueTransferPix} style={styles.button} >
            <View style={styles.areaButton} >
                <AntDesign name="arrowright" size={24} color="white" />
            </View>
                </TouchableOpacity>
                </View>)
            
        ) : (
            (valueTransferPix == 0) ? (
                <View style={styles.areaButtonBlockHide}>
            <TouchableOpacity style={styles.button} >
                <View style={styles.areaButtonBlock} >
                    <AntDesign name="arrowright" size={24} color="white" />
                </View>
            </TouchableOpacity>
            </View>) 
            : 
            (
                <View style={styles.areaButtonHide} >
            <TouchableOpacity onPress={handleValueTransferPix} style={styles.button} >
        <View style={styles.areaButton} >
            <AntDesign name="arrowright" size={24} color="white" />
        </View>
            </TouchableOpacity>
            </View>)
        )}
        
        
        
        </View>
        
        </KeyboardAvoidingView>
    
    
  )
}

export default ValueTransferPix

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginStart: 30,
        marginEnd: 30
        
    },
    title:{
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 30
    },
    label:{
        fontSize: 16,
        
        color: '#C0C0C0',
        marginVertical: 35,

    },
    textInput:{
        width: "100%",
        height: 48,
        borderBottomWidth: 1.5,
        borderBottomColor: '#dadada',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        fontSize: 20
    },
    button: {
        flex: 1,
        
    },
    areaButton:{
        backgroundColor: COLORS.black,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '80%',
        top: 150
    
    },
    areaButtonBlock:{
        backgroundColor: '#C0C0C0',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '80%',
        top: 150
    },
    areaButtonBlockHide:{
        top: 250
    },
    areaButtonHide:{
        top: 250
    },
    
    close: {
        marginTop: 50,
        
    },
})