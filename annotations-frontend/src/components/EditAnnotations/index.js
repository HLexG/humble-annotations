import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';

import Annotation from '../Annotation';
import AnnotationPanel from '../AnnotationPanel';
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
                <Box display="flex" p={1} className={classes.toolbar}>
                    <Box p={1} flexGrow={1}>
                        <span className={classes.toolbartitle}>Document: </span>
                        <span className={classes.toolbartext}>{document.document_name}</span>
                    </Box>
                    <Box p={1}>
                        <span className={classes.toolbartitle}>Sentences:</span>
                    </Box>
                    <Box p={1}>
                        <Icon className={classes.toolbaricon}>settings</Icon>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    <Grid item sm={10}>
                        <Annotation></Annotation>
                    </Grid>
                    <Grid item sm={2}>
                        <AnnotationPanel></AnnotationPanel>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default withStyles( styles )( EditAnnotations );