import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CardDs from './CardDs';
import Grid from '@material-ui/core/Grid';



const Datasets = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== AnnotationPanel ======================================");

    // Component States
    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
            <CardDs key={1}/>
            </Grid>
            <Grid item xs={6}>
            <CardDs/>
            </Grid>
          </Grid>
          
        </div>
    );
};

export default withStyles( styles )( Datasets );