import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Annotation from '../Annotation';
import AnnotationPanel from '../AnnotationPanel';
import DataService from '../../services/DataService';
import styles from './styles';
import { handleApplyFeatureExtraction, ClearAnnotations } from './handlers';



const EditAnnotations = (props) => {
    const { classes } = props;
    const { history } = props;

    let id = props.match.params.id;
    console.log(id);

    console.log("================================== EditAnnotations ======================================");

    // Component States
    const [document, setDocument] = useState(null);

    const loadDocument = () => {
        DataService.GetDocument(id)
            .then(function (response) {
                setDocument(response.data);
            })
    }

    // Setup Component
    useEffect(() => {
        loadDocument();
    }, []);

    return (
        <div className={classes.root}>
            <main className={classes.main}>

            </main>
        </div>
    );
};

export default withStyles(styles)(EditAnnotations);