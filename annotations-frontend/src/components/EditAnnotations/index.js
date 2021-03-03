import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

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
                Edit Annotations Content...
            </main>
        </div>
    );
};

export default withStyles( styles )( EditAnnotations );