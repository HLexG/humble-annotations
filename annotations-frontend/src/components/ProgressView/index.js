import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import axios from "axios";
import styles from './styles';
import DataServices from "../../services/DataServices";
//import db from './fb';

//import {handlePullMentions }from "./handlers";
/*
//const axios = require('axios');
var admin = require("firebase-admin");

var serviceAccount = require("./hlexg-63f51-firebase-adminsdk-sowzl-31be6ac6ff.json");
*/
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var srvcURL = 'firebase-adminsdk-sowzl@hlexg-63f51.iam.gserviceaccount.com'

//let query = firestore.collection('mentions').where('foo', '==', 'bar');


const fbPull = async () =>{
  let query = firestore.collection('mentions');
  query.get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      console.log(`Found document at ${documentSnapshot.ref.path}`);
    });
  });};*/

const Progress = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== Dashboard ======================================");
    
    const [dataset , setDataset] = useState(null);
    const [documents , setDocuments] = useState(null);
    const [document , setDocument] = useState(null);
    const [setTokens] = useState([]);
    const [setAnnotations] = useState(null);
    const [mentions , setMentions] = useState([]);



    // Setup Component
/*
    useEffect(() => {
        handlePullMentions();
      }, []);
    
      const handlePullMentions = async () => {
        /*
        const response = await axios.get('http://0.0.0.0:9000/v1/mentions?dataset_id=1');
        setMentions(response.data);
        console.log('ran');
        */
/*
        let query = db.collection('mentions');

        let qOuts = await query.get();
        
        for(const doc of qOuts.docs){
          console.log(doc.data());
          setMentions(doc.data());
        }
        };
*/
    // Component States
    return (
        <div className="Dash">
          <ul>
        {}
      </ul>

          


            
        </div>
    );
};

export default withStyles( styles )( Progress );