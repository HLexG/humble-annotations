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
  {id: 1, title: 'CeleBERTy', descr: 'Welcome to learning React! Welcome to learning React! Welcome to learning React!'},
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

    const [dialogOpen, setOpen] = useState(false);

    const [formTitle, setFormTitle] = useState("");
    const [formDescr, setFormDescr] = useState("");
    const [selectedFormFile, setSelectedFormFile] = useState(null);


  //   const loadDatasets = () => {
  //     DataService.GetDatasets()
  //     .then(function (response) {
  //         setDataset(response.data[0]);
  //         // Load the documents
  //         return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
  //     })
  //     .then(function (response) {
  //         setDocuments(response.data);
  //     })
  // }


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
      

      const datasetInfo = {
        dataset_name: formTitle,
        dataset_description: formDescr
      }

      DataService.UploadDatasetInfo(datasetInfo)
      .then(function (response) {
          console.log(response.data);


          //convertBase64(selectedFormFile)
          //.then(fileBase64 => {
          //  console.log("File Is", fileBase64);

            DataService.UploadDataset(response.data.id, selectedFormFile)
            .then(function (response) {
                console.log(response.data);
      
                
                // let annotations = response.data;
      
            })
   
          
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
    };

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