import { Platform,StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Image, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { Ionicons } from "@expo/vector-icons"
import Checkbox from 'expo-checkbox';
import Button from '../components/Button'
import { TextInputMask } from 'react-native-masked-text'
import { BlurView } from 'expo-blur'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../services/firebase'
import { setDoc, doc } from 'firebase/firestore'
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


const SignUp = ({navigation}) => {
    
    
    const [isPasswordShown, setIsPasswordShown] = useState(true)
    const [isChecked, setIsChecked] = useState(false)

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ balance, setBalance ] = useState(0);
    const [ privateKey, setPrivateKey ] = useState('');
    const [ publicKey, setPublicKey ] = useState('');
    const [ institution, setInstitution ] = useState('CB PAGAMENTOS - IP');
    const phoneRef = useRef(null)
    const [ date, setDate ] = useState('');
    const [ cpf, setCpf ] = useState('');
    const cpfRef = useRef(null)
    const [ gender, setGender ] = useState('');
  
    async function handleSignUp() {

    
    // console.log('privateKey:', wallet.privateKey)
    // console.log('privateKey:', wallet.mnemonic.password)

    const unmaskPhone = phoneRef?.current.getRawValue()
    const unmaskCpf = cpfRef?.current.getRawValue()

      await createUserWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        const wallet = ethers.Wallet.createRandom()
        // console.log('address:', wallet)
        const data = {
            id: userCred?.user.uid,
            username,
            password,
            balance,
            phone: unmaskPhone,
            cpf: unmaskCpf,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            addressWallet: wallet.address,
            institution,
            providerData: userCred.user.providerData[0]
            
        }
        setDoc(doc(db, 'users', userCred?.user.uid), data).then(()=>{
            navigation.navigate('Splash')
        })
        console.log('Cadastrado com sucesso \n' + userCred.user.uid)
      })
      .catch(error => {
        console.log(error)
      })
    }
  
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor: COLORS.white}}
        >
            
            <KeyboardAvoidingView  
            
            keyboardVerticalOffset={10}
            style={styles.container}
            behavior={Platform.select({android: 'height', ios: 'padding'})}
            >

                <ScrollView>
                
                    <Text style={styles.title} >
                        Criar uma conta
                    </Text>
                    
    
                
                {/* nome */}
                
                    <Text
                    style={styles.inputTextTitle}
                    >Nome:</Text>
    
                    
                        <TextInput
                        style={styles.input}
                        placeholder='Digite o nome de usúario'
                        placeholderTextColor="#C0C0C0"
                        value={username}
                        onChangeText={ text => setUsername(text)}
                        
                        
                        />
    
                    
    
                
                {/* email */}
                
                    <Text
                    style={styles.inputTextTitle}
                    >Endereço de email:</Text>
    
                        <TextInput
                        style={styles.input}
                        placeholder='Digite seu endereço de e-mail'
                        placeholderTextColor="#C0C0C0"
                        keyboardType='email-address'
                        value={email}
                        onChangeText={ text => setEmail(text)}
                        
                        />
    
                    
                {/* senha */}
                
                    <Text
                    style={styles.inputTextTitle}
                    >Senha:</Text>
                    <View style={styles.input} >
                        <TextInput
                        placeholder='Digite sua senha'
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry={isPasswordShown}
                        value={password}
                        onChangeText={ text => setPassword(text)}
                        
                        />
    
                        <TouchableOpacity
                        onPress={()=>setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: "absolute",
                            right: 12
                        }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black}/>
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black}/>
                                )
                            }
                            
                        </TouchableOpacity>
    
                    </View>
    
                
    
                {/* confirmar a senha */}
                
                    <Text
                    style={styles.inputTextTitle}
                    >Confirme sua senha:</Text>
                    
                        <TextInput
                        style={styles.input}
                        placeholder='Confirme sua senha'
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry={isPasswordShown}                 
                        value={confirmPassword}
                        onChangeText={ text => setConfirmPassword(text)}
                        
                        
                        />
    

    
                
    
    
                {/* phoneinput */}
                
                    <Text
                    style={styles.inputTextTitle}
                    >Número de Contato:</Text>
    
                        <TextInputMask 
                            style={styles.input}
                            placeholder='Digite seu número de telefone'
                            placeholderTextColor="#C0C0C0"
                            type='cel-phone'
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={phone}
                            onChangeText={ text => setPhone(text)}
                            ref={phoneRef}
                            
                        />
    
                    
    
                
                
                
                    <Text
                    style={styles.inputTextTitle}
                    >Endereço de CPF:</Text>
    
                    <TextInputMask
                            style={styles.input}
                            placeholder='Digite seu CPF'
                            placeholderTextColor="#C0C0C0"
                            type='cpf'
                            value={cpf}
                            onChangeText={ text => setCpf(text) }
                            ref={cpfRef}
                    />  
    
                
    
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
                onPress={handleSignUp}
                title="Inscrever-se"
                filled
                style={{
                    marginTop: 18,
                    marginBottom: 4,
    
                }}
                />
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }} >
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    
                    
                </View>
                
    
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    marginVertical: 22
                }}>
                    <Text style={{fontSize: 16, color: COLORS.black}}>Já tem uma conta ?</Text>
                    <Pressable
                    onPress={()=>navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }}>Conecte-se</Text>
    
                    </Pressable>
    
                </View>

                </ScrollView>
    
            </KeyboardAvoidingView>
            
            
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 22,
        marginEnd: 22
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 22
    },
    inputTextTitle:{
        fontSize: 16,
        fontWeight: "400",
        marginVertical: 18,
    },
    checkbox:{
        
        flexDirection: 'row',
        marginVertical: 20,
        

    },
  })