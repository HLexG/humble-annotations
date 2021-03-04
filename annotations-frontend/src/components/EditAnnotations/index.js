import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import Annotator from '../Annotator';
import DataServices from "../../services/DataServices";
import styles from './styles';

const EditAnnotations = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== EditAnnotations ======================================");

    // Component States
    const [id , setId] = useState(null);
    const [document , setDocument] = useState(null);
    const loadDocument = (id) => {
        DataServices.GetDocument(id)
            .then(function (response) {
                setDocument(response.data);
            })
    }

    // Setup Component
    useEffect(() => {
        if(props.match.params.id){
            setId(props.match.params.id);
        }
      }, []);
    useEffect(() => {
        if(id){
            loadDocument(id);
        }
      }, [id]);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
            <Annotator></Annotator>
            </main>
        </div>
    );
};

export default withStyles( styles )( EditAnnotations );