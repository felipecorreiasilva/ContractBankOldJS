import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { TextInputMask } from "react-native-masked-text";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import {
  getDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const cpfRef = useRef(null);
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const unmaskCpf = cpfRef?.current.getRawValue();
    const q = query(collection(db, "users"), where("cpf", "==", unmaskCpf));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docCpf) => {
      // doc.data() is never undefined for query doc snapshots
      const CpfRef = docCpf.data();
      // console.log(docCpf.id, " => ", CpfRef.providerData.email);

      signInWithEmailAndPassword(auth, CpfRef.providerData.email, password)
        .then((userCred) => {
          //console.log('Doc:', docSnap)
          console.log("UserCred:", userCred);
          if (userCred) {
            // console.log("User ID", userCred?.user.uid)
            getDoc(doc(db, "users", userCred?.user.uid)).then((docSnap) => {
              if (docSnap.exists()) {
                // console.log("User Data :", docSnap.data())
                dispatch(SET_USER(docSnap.data()));
              }
            });
          }
        })
        .catch((err) => {
          console.log("Error :", err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMessage("Password Mismatch");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User Not Found");
            setInterval(() => {
              setAlert(false);
            }, 2000);
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email Address");
          }
          setInterval(() => {
            setAlert(false);
          }, 2000);
        });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Seja bem vindo novamente!
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Olá novamente, você fez falta!
          </Text>
        </View>

        <Text style={styles.inputTextTitle}>Endereço de CPF</Text>

        <TextInputMask
          style={styles.input}
          placeholder="Digite seu CPF"
          placeholderTextColor="#C0C0C0"
          type="cpf"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          ref={cpfRef}
        />

        {alert && <Text style={{ color: "red" }}>{alertMessage}</Text>}

        <Text style={styles.inputTextTitle}>Senha:</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#C0C0C0"
            secureTextEntry={isPasswordShown}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </View>

        <View 
                style={styles.checkbox}
                >
                    <Checkbox
                    style={{marginRight: 8}}
                    value={ isChecked }
                    onValueChange={ setIsChecked }
                    color={ isChecked ? COLORS.primary : undefined }
                    />
    
                    <Text>Eu concordo com os termos e condições</Text>
    
                </View>

        <Button
          onPress={handleLogin}
          title="Conecte-se"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Não tem uma conta?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Inscrever-se
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 22,
    marginEnd: 22,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
  },
  inputTextTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 18,
  },
  checkbox:{
    
    flexDirection: 'row',
    marginVertical: 20,
    

},
});
