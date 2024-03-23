import { StyleSheet, Text, View, FlatList, Button, RefreshControl } from 'react-native'
import React, {useRef, useCallback, useMemo, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Balance from '../components/Balance'
import Movements from '../components/Movements'
import Actions from '../components/Actions'
import { db } from '../services/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { SET_USER } from '../context/actions/userActions'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet'
import AreaPix from './AreaPix'
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView } from 'moti'
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
const {abi} = require("../artifacts/contracts/MyToken.sol/MyToken.json")
const CONTRACT_ADDRESS = '0x8eBb8D7007dd9Bfa469766043F57086261C7dA81'

const list = [
  
  {
    id: 1,
    label: 'Boleto conta luz',
    value: '300,90',
    date: '17/09/2022',
    type: 0 // Despesas
  },
  
  {
    id: 2,
    label: 'Pix Cliente X',
    value: '2.500,00',
    date: '17/09/2022',
    type: 1 // Despesas
  },
  
  {
    id: 3,
    label: 'Salário',
    value: '7.200,90',
    date: '17/09/2022',
    type: 1 // Despesas
  },

]

const Home = () => {
  
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [userDb, setUserDb] = useState({})
    const [etherBalance, setEtherBalance] = useState(0)
    // console.log("Logged user: ", user)

    const [refresh, setRefresh] = React.useState(false)
    const [status, setStatus] = React.useState(false)

    const onRefresh = () => {
      setRefresh(true)
      setTimeout(() => {
        setRefresh(false)
        setStatus(true)
      }, 2800);
    }

    const currencyFormatter = (lang, currency, balance)=> Intl.NumberFormat(lang,{
      style: "currency",
      maximumFractionDigits: 2,
      currency,

  }).format(balance)

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
              // const CONTRACT_ADDRESS = process.env.C_ADDRESS
              const cMyToken = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
              // const balance = await provider.getBalance(user.addressWallet)
              const balance = await cMyToken.balanceOf(user.addressWallet)
              console.log('aquiiii', balance)
              setEtherBalance(balance)

            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
          }
      }
      handleGetData()
      
      
  }, [refresh])
    
  return (

    

    <View style={styles.container}
    
    >
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
    }
    >
      <Header username={user?.username} />
      <Balance saldo={currencyFormatter("pt-BR", "BRL", (Number(etherBalance) / 10e11))}/>
      <Actions/>
      <Text style={styles.title} >Últimas movimentações</Text>
      
    </ScrollView>  

      
      <FlatList
      
      style={styles.list}
      data={list}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <Movements data={item} />}
      />

      
      
      
      
      
    </View>

    
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14

  },
  list: {
    marginStart: 14,
    marginEnd: 14
  }
})