import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CardDs from './CardDs';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const testDatasets = [
  {id: 1, title: 'Celeberty', descr: 'Welcome to learning React! Welcome to learning React! Welcome to learning React!'},
  {id: 2, title: 'Apple News', descr: 'You can install React from npm. You can install React from npm. You can install React from npm.'},
  {id: 3, title: 'Harry p', descr: 'You can install React from npm. Welcome to learning React! Welcome to learning React!'}

];

// TODO: Pull out the actual basic info of all the dataset
const datasets = testDatasets;

const Datasets = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== AnnotationPanel ======================================");

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>Datasets</h1>
          <p className={classes.headerTextStyle}>Here you can find datasets that you can help to annotate. You can also upload your own dataset so you and your team can start annotating</p>
          <div className={classes.dsButtons}>
            <Button variant="contained" color="primary" className={classes.uploadButton}>
              Upload clean dataset
            </Button>
            <Button variant="contained" color="secondary">
              Upload annotated dataset
            </Button>
          </div>
          <Grid container spacing={3}>
          {datasets.map(ds => {
              return (
                <Grid item xs={4} key={ds.id}>
                  <CardDs ds={ds}/>
                </Grid>
              );
            })}
          </Grid>
          
        </div>
    );
};

export default withStyles( styles )( Datasets );