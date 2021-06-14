import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CrossDocCard from './CrossDocCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const testDatasets = [
  {id: 1, title: 'CeleBERTy', descr: 'Welcome to learning React! Welcome to learning React! Welcome to learning React!'},
  {id: 2, title: 'Apple News', descr: 'You can install React from npm. You can install React from npm. You can install React from npm.'},
  {id: 3, title: 'Harry p', descr: 'You can install React from npm. Welcome to learning React! Welcome to learning React!'}

];

// TODO: Pull out the actual basic info of all the dataset
const datasets = testDatasets;

const CrossDocOverview = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== CrossDocOverview ======================================");

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>Cross Doc for CeleBERTy</h1>
          <p className={classes.headerTextStyle}>Some general info about this dataset</p>
          <div className={classes.dsButtons}>
            {/* <Button variant="contained" color="secondary">
              Upload annotated dataset
            </Button> */}
          </div>
          {/* <Grid container spacing={3}>
          {datasets.map(ds => {
              return (
                <Grid item xs={4} key={ds.id}>
                  <CrossDocCard ds={ds}/>
                </Grid>
              );
            })}
          </Grid> */}
          
        </div>
    );
};

export default withStyles( styles )( CrossDocOverview );