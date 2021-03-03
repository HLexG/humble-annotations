import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const Annotator = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Annotator ======================================");

    // Component States

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item sm={10}>
                    Left Panel....
                </Grid>
                <Grid item sm={2}>
                    Tools Panel...
                </Grid>
            </Grid>
            
        </div>
    );
};

export default withStyles( styles )( Annotator );