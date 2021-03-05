import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';

const AnnotationPanel = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== AnnotationPanel ======================================");

    // Component States

    return (
        <div className={classes.root}>
            
            AnnotationPanel...
        </div>
    );
};

export default withStyles( styles )( AnnotationPanel );