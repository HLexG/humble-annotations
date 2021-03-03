import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import Annotator from '../Annotator';
import styles from './styles';

const EditAnnotations = ( props ) => {
    const {classes} = props;
    const { history } = props;
    //console.log(props)

    console.log("================================== EditAnnotations ======================================");

    // Component States

    return (
        <div className={classes.root}>
            <main className={classes.main}>
            <Annotator></Annotator>
            </main>
        </div>
    );
};

export default withStyles( styles )( EditAnnotations );