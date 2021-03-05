import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';

const Annotation = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Annotation ======================================");

    // Component States

    return (
        <div className={classes.root}>
            Annotation....
            
        </div>
    );
};

export default withStyles( styles )( Annotation );