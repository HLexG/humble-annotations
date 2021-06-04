import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';

import styles from './styles';

const Datasets = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== AnnotationPanel ======================================");

    // Component States
    return (
        <div className={classes.datasetsPanel}>
            <div>
               <h2>test</h2>
            </div>
            
            
        </div>
    );
};

export default withStyles( styles )( Datasets );