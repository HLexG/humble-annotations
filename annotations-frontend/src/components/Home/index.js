import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import DataServices from "../../services/DataServices";
import styles from './styles';

const Home = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Home ======================================");

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                Home Page Content...
            </main>
        </div>
    );
};

export default withStyles( styles )( Home );