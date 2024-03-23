import { initializeApp, getApps, getApp } from "firebase/app";
// import {initializeAuth, getAuth } from 'firebase/auth'
import { initializeAuth, getAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore, doc} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//
const firebaseConfig = {
  // informe suas config do firebase aqui
};

const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getFirestore(app)
export { app, auth, doc };
