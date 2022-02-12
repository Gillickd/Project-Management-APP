import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBI7QoqlItn2qmSeq6LVux4-wAcg4hbvuk",
    authDomain: "dojo-7747f.firebaseapp.com",
    projectId: "dojo-7747f",
    storageBucket: "dojo-7747f.appspot.com",
    messagingSenderId: "426763438107",
    appId: "1:426763438107:web:cae87e8dbebeddde9f90be",
    measurementId: "G-NRJSVN2E7Y"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

//timestamp

const timestamp = firebase.firestore.Timestamp

  //doFirestore is name of project

  


  export {projectFirestore, projectAuth, projectStorage, timestamp}