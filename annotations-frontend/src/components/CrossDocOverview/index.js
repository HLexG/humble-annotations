import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CrossDocCard from './CrossDocCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';
import CollapsibleTable from './CrossDocReviewTable';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EventIcon from '@material-ui/icons/Event';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

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

    // PAGE DETAILS
    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");

    //TOGGLE ENTITIES/EVENTS

    const [stateEntityTable, setStateEntityTable] = React.useState(() => ['entities', 'xdocevents']);
  
    const handleTableToggle = (event, newTables) => {
      setStateEntityTable(newTables);
    };

    


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
          <ToggleButtonGroup value={stateEntityTable} onChange={handleTableToggle} aria-label="text formatting">
      <ToggleButton value="entities" aria-label="Entities">
        <NaturePeopleIcon /> Entities
      </ToggleButton>
      <ToggleButton value="xdocevents" aria-label="Events" disabled>
        <EventIcon /> Events
      </ToggleButton>
      
    </ToggleButtonGroup>
          <div className={classes.dsButtons}>
            <CollapsibleTable/>
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