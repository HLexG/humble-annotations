import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import axios from "axios";
import styles from './styles';
import DataServices from "../../services/DataServices";
//import {handlePullMentions }from "./handlers";

//const axios = require('axios');



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

    useEffect(() => {
        handlePullMentions();
      }, []);
    
      const handlePullMentions = async () => {
        const response = await axios.get('http://0.0.0.0:9000/v1/mentions?dataset_id=1');
        setMentions(response.data);
        console.log('ran');
    
        };
    // Component States
    return (
        <div className="Dash">

<ul>
        {mentions.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
            
        </div>
    );
};

export default withStyles( styles )( Progress );