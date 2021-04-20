import { firebase } from "@firebase/app"; 
import "@firebase/firestore"; 
import axios from "axios";
var admin = require("firebase-admin");
var serviceAccount = require("./hlexg-0420.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hlexg-63f51-default-rtdb.firebaseio.com"
  });

const {Firestore} = require('@google-cloud/firestore');
const firestore = new admin.firestore();



const db = firestore;

/*
  query.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      //console.log(`Part of Speech: ${documentSnapshot.pos}`);
      //console.log(`Content: ${documentSnapshot.text}`);
    });
  });

const firebaseApp = firebase.initializeApp({ 
        apiKey: "AIzaSyCRIfYEedX-KFBjCSUvr3BsEvZoIK3OQdQ", 
        authDomain: "hlexg-63f51.firebaseapp.com", 
        databaseURL: "https://hlexg-63f51-default-rtdb.firebaseio.com/", 
        projectId: "hlexg-63f51", 
        storageBucket: "gs://hlexg-63f51.appspot.com", 
        messagingSenderId: "1052628677159" 
    }); 

const db = firebaseApp.firestore();
    axios.get(`https://firestore.googleapis.com/v1/projects/hlexg-63f51/databases/(default)/documents/mentions`)
     .then(response => { 
         console.log(response); 
        })
        .catch(error => { 
            console.log(error); 
        });
*/
export default db;