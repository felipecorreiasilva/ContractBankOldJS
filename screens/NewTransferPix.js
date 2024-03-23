import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform
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

const NewTransferPix = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // console.log("Logged user: ", user.valueTransferPix)
  const [pixKey, setPixKey] = useState(null);
  const [userDb, setUserDb] = useState({});
  const [checkedTransition, setCheckedTransition] = useState(false);
  const [newTransferPix, setNewTransferPix] = useState({});
  const [buttonsVisible, setButtonsVisible] = useState(false);
  // console.log("petroleo",user.id)

  const currencyFormatter = (lang, currency, balance) =>
    Intl.NumberFormat(lang, {
      style: "currency",
      maximumFractionDigits: 2,
      currency,
    }).format(balance);

    async function handleNewTransferPix() {

        const newTransferPixDoc = doc(db, 'users', user.id);
        // const newTransferPixCollection = collection(newTransferPixDoc, "newTransferPix")
    
        
            await setDoc(newTransferPixDoc, { newTransferPix }, { merge: true }).then(()=>{
                // console.log('user', userDb.id)
                // console.log('user', newTransferPix.id)
                dispatch(SET_USER({...userDb, newTransferPix}))
                navigation.navigate('ToTransferPix')

            }).catch((err)=>{

                console.log('error: ', err)

            })


    }

  useEffect(() => {
    const handleGetData = async () => {
      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setUserDb({ ...data });
        dispatch(SET_USER({ ...data }));
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    handleGetData();
  }, []);

  useEffect(() => {
    const handleGetDataNewTransferPix = async () => {
      const q = query(
        collection(db, "users"),
        where("cpfKeyPix", "==", pixKey)
      );

    if (pixKey != newTransferPix.cpfKeyPix) setCheckedTransition(false);

      const querySnapshot = await getDocs(q)
        
          querySnapshot.forEach((docPixKey) => {
            if (docPixKey.exists()) {
              setCheckedTransition(true);
              const fromTransitionToRef = docPixKey.data();
              console.log('IDDDD', docPixKey.id)
              const data = {
                id: fromTransitionToRef.id,
                cpf: fromTransitionToRef.cpf,
                username: fromTransitionToRef.username,
                valueTransferPix: user.valueTransferPix,
                publicKey: fromTransitionToRef.publicKey,
                addressWallet: fromTransitionToRef.addressWallet,
    
            }
              console.log("Chave Pix Encontrada: ", data);
              setNewTransferPix({ ...data });
              dispatch(SET_USER({...userDb, newTransferPix: data}))
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          });
        
        
    };
    handleGetDataNewTransferPix();
    // console.log("balance aqui", userDb.balance)
  }, [pixKey]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setButtonsVisible(true);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      setButtonsVisible(false);
    });
  });

  return (
    <KeyboardAvoidingView
        keyboardVerticalOffset={25}
        style={styles.container}
        behavior={Platform.select({android: 'height', ios: 'padding'})}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.close}
      >
        <Ionicons name="chevron-back-sharp" size={40} color="#7a7979" />
      </TouchableOpacity>
      <Text style={styles.title}>
        Para quem você quer transferir{" "}
        {currencyFormatter("pt-BR", "BRL", userDb?.valueTransferPix / 100)} ?
      </Text>
      <Text style={styles.text}>
        Encontre um contato na sua lista ou inicie uma nova transferência
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Nome, CPF/CNPJ ou chave Pix"
        placeholderTextColor="#C0C0C0"
        value={pixKey}
        onChangeText={(text) => setPixKey(text)}
      />

      <Text style={styles.textB}>Contatos Frequentes</Text>

      {buttonsVisible ? (
        checkedTransition ? (
          <View>
            <TouchableOpacity
              onPress={handleNewTransferPix}
              style={styles.button}
            >
              <View style={styles.areaButton}>
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.button}>
              <View style={styles.areaButtonBlock}>
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )
      ) : checkedTransition ? (
        <View style={styles.areaButtonHide}>
          <TouchableOpacity
            onPress={handleNewTransferPix}
            style={styles.button}
          >
            <View style={styles.areaButton}>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.areaButtonBlockHide}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.areaButtonBlock}>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default NewTransferPix;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 30,
    marginEnd: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "#525151",
    marginBottom: 40,
  },
  textB: {
    fontSize: 17,
    marginTop: 50,
  },
  textInput: {
    width: "100%",
    height: 48,
    borderBottomWidth: 1.5,
    borderBottomColor: "#dadada",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 18,
  },
  close: {
    marginTop: 50,
  },
  button: {
    flex: 1,
  },
  areaButton: {
    backgroundColor: COLORS.black,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "80%",
    top: 40,
  },
  areaButtonBlock: {
    backgroundColor: "#C0C0C0",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "80%",
    top: 40,
  },
  areaButtonBlockHide: {
    top: 250,
  },
  areaButtonHide: {
    top: 250,
  },
});
