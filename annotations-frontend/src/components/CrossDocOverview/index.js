import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CrossDocCard from './CrossDocCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';


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

    const { match: { params } } = props;

    console.log("================================== CrossDocOverview ======================================");


    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");



    


    useEffect(() => {
        DataService.GetDataset(params.dsID)
            .then(function (response) {
        console.log(response.data)
        setPageDesc(response.data['dataset_description'])
        setPageTitle(response.data['dataset_name']);
      })
        }, []) 
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>{pageTitle}</h1>
          <p className={classes.headerTextStyle}>{pageDesc}</p>
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