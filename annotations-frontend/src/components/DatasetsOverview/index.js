import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import DatasetCard from './DatasetCard';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UploadDsCard from './UploadDsCard';
import DataService from "../../services/DataService";


import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const delay = ms => new Promise(res => setTimeout(res, ms));


const DatasetsOverview = ( props ) => {
  const {classes} = props;

  // States
  const [dialogOpen, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescr, setFormDescr] = useState("");
  const [selectedFormFile, setSelectedFormFile] = useState(null);
  const [datasets, setDataset] = useState([]);
  const [dsetId, setDsetId] = useState(0);
  const [dataUploaded, setDataUploaded] = React.useState(false);
  const [dataLoading, setDataLoading] = React.useState(false);


    const buttonUd = {
        ...(dataUploaded && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };



    // does the job of componentDidMount, componentDidUpdate, componentWillUpdate combined
  useEffect(() => {
    loadDatasets()
  }, []) // Needed [], else we get an infinite loop to the state changing in loadDatasets()


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

  const submitNewDataset = async () => {
    // Log popup values for testing
    console.log(formTitle);
    console.log(formDescr);
    console.log(selectedFormFile);
    setDataLoading(true);
    
    // Construct the object for our initial db instance creation
    const datasetInfo = {
      dataset_name: formTitle,
      dataset_description: formDescr
    }

    // We can now close the dialog
    handleCloseDialog();

    // Initial dataset creation, needs the title and description
    DataService.UploadDatasetInfo(datasetInfo)
    .then(function (response) {
        console.log(response.data);
        setDsetId(response.data)
        console.log(response.data);

          // Subsequent update to the dataset entry we create to add the actual dataset
          DataService.UploadDataset(response.data.id, selectedFormFile)
          .then(function (response) {
              console.log(response.data);

              // Inform the user
              setDataUploaded(true);
              setDataLoading(false);
              alert(`Dataset '${formTitle}' uploaded succesfully!`)

              // Reload screen to display new ds as well
              loadDatasets()
          })
          .catch(err => {
            console.log(err);
            alert(`Uploading Dataset '${formTitle}' went wrong, please check logs`)
          });

    })
    .catch(err => {
      console.log(err);
      alert(`Uploading Dataset '${formTitle}' went wrong, please check logs`)
    });
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
          <Button variant="contained" color="success" className={classes.uploadButton} onClick={handleClickOpenDialog}>
            Upload clean dataset
          </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="info"
                        sx={buttonUd}
                        onClick={submitNewDataset}
                    >
                        {dataUploaded ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {dataLoading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: 'secondary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
            </Box>

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
            dataUploaded = {dataUploaded}
            setDataUploaded = {setDataUploaded}
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

export default withStyles( styles )( DatasetsOverview );