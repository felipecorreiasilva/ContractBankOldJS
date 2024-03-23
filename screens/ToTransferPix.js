import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { db } from "../services/firebase";
import {
  getDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  setDoc,
  addDoc
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";
import Button from "../components/Button";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
const {abi} = require("../artifacts/contracts/MyToken.sol/MyToken.json")
const CONTRACT_ADDRESS = '0x8eBb8D7007dd9Bfa469766043F57086261C7dA81'

const ToTransferPix = ({ navigation }) => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  const [userDb, setUserDb] = useState({})
  const [toTransferPix, setToTransferPix] = useState({})
  // console.log("deus e bom", toTransferPixDoc)
  const [refresh, setRefresh] = React.useState(false)
  const [status, setStatus] = React.useState(false)
  
  
  async function handleToTransferPix() {
    
    const fromTransferPixDoc = doc(db, 'users', user.id);
    const fromTransferPixCollection = collection(fromTransferPixDoc, "completedTransferPix")
    const toTransferPixDoc = doc(db, 'users', toTransferPix?.id);
    const toTransferPixCollection = collection(toTransferPixDoc, "completedTransferPix")
    
    const toCompletedTransferPix = {
        id: user.id,
        cpf: user.cpf,
        username: user.username,
        valueTransferPix: user.valueTransferPix,
        publicKey: user.publicKey,
        addressWallet: user.addressWallet

    }
    
    const fromCompletedTransferPix = {
        id: toTransferPix.id,
        cpf: toTransferPix.cpf,
        username: toTransferPix.username,
        valueTransferPix: toTransferPix.valueTransferPix,
        publicKey: toTransferPix.publicKey,
        addressWallet: toTransferPix.addressWallet

    }

    // let wallet = new ethers.Wallet(user.privateKey, provider);
    // let amount = ethers.parseEther('1.0');

    const api = 'api da infura'
    const provider = new ethers.getDefaultProvider(api)
    const signer = new ethers.Wallet(user.privateKey, provider)
    const cMyToken = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
    // const balance = await provider.getBalance(user.addressWallet)
    
      cMyToken.transfer(toTransferPix.addressWallet, BigInt(user.valueTransferPix * 10e9)).then((tx)=>{

          addDoc(fromTransferPixCollection, { ...fromCompletedTransferPix }, { merge: true }).then(()=>{

            addDoc(toTransferPixCollection, { ...toCompletedTransferPix }, { merge: true }).then(()=>{
              
              console.log("Usuario to: ", toCompletedTransferPix)
              dispatch(SET_USER({...user, fromCompletedTransferPix}))
              navigation.navigate('Home')
              console.log('Trasition: ', tx)

            }).catch((err)=>{

                console.log('error: ', err)

            })

        }).catch((err)=>{

            console.log('error: ', err)

        })

      })  
    
    }

    const onRefresh = () => {
      setRefresh(true)
      setTimeout(() => {
        setRefresh(false)
        setStatus(true)
      }, 2800);
    }

  const currencyFormatter = (lang, currency, balance) =>
    Intl.NumberFormat(lang, {
      style: "currency",
      maximumFractionDigits: 2,
      currency,
    }).format(balance);

    useEffect(() => {
      const handleGetData = async() =>{

        const toTransferPixDoc = doc(db, 'users', user.id);
        const toTransferPixDocFrom = doc(db, 'users', toTransferPixDoc?.id);
        // const newTransferPixCollection = collection(newTransferPixDoc, "newTransferPix")
        // setToTransferPix([])
        // const myToTransferPix = []

          const docSnap = await getDoc(toTransferPixDoc);
          
            if (docSnap.exists()) {
              
              const data = docSnap.data()
              
              setUserDb({ ...data });
              setToTransferPix({...data?.newTransferPix})
              dispatch(SET_USER({...data, toTransferPix: data?.newTransferPix}))
              // dispatch(SET_USER({...data, ...data?.newTransferPix}))
            } else {
              
              console.log("No such document!");
            }
          
          
      }
      handleGetData()
      
  }, [refresh])

  return (
    <KeyboardAvoidingView
    style={styles.container}
    keyboardVerticalOffset={10}
    behavior={Platform.select({android: 'height', ios: 'padding'})}
    >
    
    <ScrollView
    
    refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
    }
    >
      
    

      <Text style={styles.title}>Transferindo</Text>
      <Text style={styles.balance}>{currencyFormatter("pt-BR", "BRL", toTransferPix?.valueTransferPix / 100)}</Text>
      {/* bote um touchable de editar aqui */}
      <View style={styles.fromUsername}>
        <Text  style={{ fontSize: 20 }}>para</Text>
        <Text style={{ marginLeft: 10, fontWeight: 'bold',fontSize: 20}} >{toTransferPix?.username}</Text>
      </View>
      
      {/* touchable <Text>Escrever uma menssagem...</Text> */}
      <View style={styles.fromData}>
      <Text style={{...styles.fromDataText, color: '#7d7d7d'}} >CPF</Text>
      <Text style={styles.fromDataText} >{toTransferPix?.cpf}</Text>

      </View>

      <View style={styles.fromData}>
      <Text style={{...styles.fromDataText, color: '#7d7d7d'}}>Instituição</Text>
      <Text style={styles.fromDataText}>CB PAGAMENTOS - IP</Text>

      </View>

      <Button
            onPress={handleToTransferPix}
            title="Transferir"
            filled
            style={{
                marginTop: 24,
            }}
            />
      

    </ScrollView>


    </KeyboardAvoidingView>
    
  )
}

export default ToTransferPix

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginStart: 30,
    marginEnd: 30
    
  },
  balance: {
    fontSize: 30
  },
  fromUsername: {
    marginTop: 20,
    flexDirection: 'row'
  },
  fromData:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    
  },
  fromDataText:{
    fontSize: 16,
    fontWeight: '400'
  },
  title:{
      marginTop: 50,
      fontWeight: 'bold',
      fontSize: 25
  },
})