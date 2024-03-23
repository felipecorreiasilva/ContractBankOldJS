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

const CompletedTransferPix = ({ navigation }) => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // console.log("cagao: ", user.newTransferPix)
  
  const [userDb, setUserDb] = useState({})
  const [toTransferPix, setToTransferPix] = useState([])
  const newTransferPix = toTransferPix[toTransferPix.length-1]?.newTransferPix
  console.log("deus e bom", newTransferPix)
  const [refresh, setRefresh] = React.useState(false)
  const [status, setStatus] = React.useState(false)

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

    async function handleNewTransferPix() {

      const newTransferPixDoc = doc(db, 'users', user.id);
      // const newTransferPixCollection = collection(newTransferPixDoc, "newTransferPix")
      
      const data = {
          id: newTransferPix.id,
          cpf: newTransferPix.cpf,
          username: newTransferPix.username,
          valueTransferPix: newTransferPix.valueTransferPix,
          publicKey: newTransferPix.publicKey

      }
      
          await setDoc(newTransferPixDoc, { newTransferPix }, { merge: true }).then(()=>{

              dispatch(SET_USER({...userDb, newTransferPix}))
              navigation.navigate('ToTransferPix')

          }).catch((err)=>{

              console.log('error: ', err)

          })


  }

    useEffect(() => {
      const handleGetData = async() =>{

        const newTransferPixDoc = doc(db, 'users', user.id);
        const newTransferPixCollection = collection(newTransferPixDoc, "newTransferPix")
        setToTransferPix([])
        const myToTransferPix = []

          const docSnap = await getDocs(newTransferPixCollection);
          docSnap.docs.map((doc)=>{
           
            // console.log("Sabia ",doc.data(), doc.id)
            myToTransferPix.push(doc.data())
            
          })

          setToTransferPix(myToTransferPix)
          
          
      }
      handleGetData()
      
  }, [refresh])

  return (
    <KeyboardAvoidingView
    style={styles.container}
    keyboardVerticalOffset={10}
    behavior={Platform.select({android: 'height', ios: 'padding'})}
    >
      <ScrollView>
        <Text>
          ola
        </Text>
      </ScrollView>

    </KeyboardAvoidingView>
    
  )
}

export default CompletedTransferPix

const styles = StyleSheet.create({})