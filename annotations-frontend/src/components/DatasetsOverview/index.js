import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import DatasetCard from './DatasetCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UploadDsCard from './UploadDsCard';
import DataService from "../../services/DataService";

const testDatasets = [
  {id: 1, dataset_name: 'CeleBERTy', dataset_description: 'Welcome to learning React! Welcome to learning React! Welcome to learning React!'},
  {id: 2, dataset_name: 'Apple News', dataset_description: 'You can install React from npm. You can install React from npm. You can install React from npm.'},
  {id: 3, dataset_name: 'Harry p', dataset_description: 'You can install React from npm. Welcome to learning React! Welcome to learning React!'}

];

const delay = ms => new Promise(res => setTimeout(res, ms));
const axios = require('axios');

// TODO: Pull out the actual basic info of all the dataset
const datasets = testDatasets;

const Datasets = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    const [dialogOpen, setOpen] = useState(false);

    const [formTitle, setFormTitle] = useState("");
    const [formDescr, setFormDescr] = useState("");
    const [selectedFormFile, setSelectedFormFile] = useState(null);
    const [datasets, setDataset] = useState(testDatasets);
    const [dsetId, setDsetId] = useState(0);


     const loadDatasets = () => {
       DataService.GetDatasets()
       .then(function (response) {
           setDataset(response.data)
           console.log(response.data)
           //const datasets = setState(response.data[0])
           // Load the documents
           //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
       })
       .then(function (response) {
           //setDocuments(response.data);
       })
   }


  // https://stackoverflow.com/a/64767180/8970591
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        resolve(file);

        file.onerror = (error) => {
        reject(error);
      }
    })
  }

    const submitNewDataset = async () => {
      
      console.log(formTitle);
      console.log(formDescr);
      console.log(selectedFormFile);

      const axios = require('axios');

      

      const datasetInfo = {
        dataset_name: formTitle,
        dataset_description: formDescr
      }

      DataService.UploadDatasetInfo(datasetInfo)
      .then(function (response) {
          console.log(response.data);
          setDsetId(response.data)
          console.log(response.data);



          //convertBase64(selectedFormFile)
          //.then(fileBase64 => {
          //  console.log("File Is", fileBase64);

            DataService.UploadDataset(response.data.id, selectedFormFile)
            .then(function (response) {
                console.log(response.data);

                
      
                
                // let annotations = response.data;
      
            })
            .then(function (response) {
;}



            )
   
          
          .catch(err => {
            console.log(err);
          });


          // let annotations = response.data;

      });

      

      


      // Lastly close when all correct info has been retrieved
      // handleCloseDialog();
    };

    const handleClickOpenDialog = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setFormTitle("");
      setFormDescr("");
      setSelectedFormFile(null);
      setOpen(false);
      loadDatasets()
    };

    const loadEvents = () => {        
      axios({
      method: 'get',
      url: `http://0.0.0.0:9013/v1/process_dataset_event/${dsetId}`,
      responseType: 'application/json'
    })
      .then(function (resp) {
        console.log('Events = Success!')
        console.log(resp)
      });}

    console.log("================================== DatasetsOverview ======================================");

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>Datasets</h1>
          <p className={classes.headerTextStyle}>Here you can find datasets that you can help to annotate. You can also upload your own dataset so you and your team can start annotating</p>
          <div className={classes.dsButtons}>
            <Button variant="contained" color="primary" className={classes.uploadButton} onClick={handleClickOpenDialog}>
              Upload clean dataset
            </Button>
            <Button variant="contained" color="primary" className={classes.uploadButton} onClick={loadDatasets}>
              refresh
            </Button>
            <Button variant="contained" color="primary" className={classes.uploadButton} onClick={loadEvents}>
              event test
            </Button>
            <UploadDsCard 
              handleClickOpenDialog={handleClickOpenDialog} 
              handleCloseDialog={handleCloseDialog} 
              dialogOpen={dialogOpen}
              formTitle={formTitle}
              setFormTitle={setFormTitle}
              formDescr={formDescr}
              setFormDescr={setFormDescr}
              setSelectedFormFile={setSelectedFormFile}
              submitNewDataset={submitNewDataset}
            />
            {/* <Button variant="contained" color="secondary">
              Upload annotated dataset
            </Button> */}
          </div>
          <Grid container spacing={3}>
          {datasets.map(ds => {
              return (
                <Grid item xs={4} key={ds.id}>
                  <DatasetCard ds={ds}/>
                </Grid>
              );
            })}
          </Grid>
          
        </div>
    );
};

export default withStyles( styles )( Datasets );