import React, {useEffect, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';


import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


import styles from './styles';

import FileUploader from '../../../common/FileUploader';


// Basic template from:
// https://react.school/material-ui/card
// https://codesandbox.io/s/material-ui-card-examples-bp96w?from-embed=&file=/CardActionsAreaExample.js:457-1003

const UploadDsCard = ( props ) => {
    const {classes, handleClickOpenDialog, handleCloseDialog,
      dialogOpen, formTitle, setFormTitle, formDescr,
      setFormDescr, setSelectedFormFile, submitNewDataset, dataUploaded} = props;


    console.log("================================== UploadDsCard ======================================");

    // Component States

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const timer = React.useRef();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };



    return (
      <div>
        <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Upload a clean dataset</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can upload a zip file with the dataset's documents as .txt files. 
              We also ask you to please provide a general description of the dataset and a title.
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="title"
              label="Title"
              type="outlined"
              required={true}
              inputProps={{ minLength: 5 }}
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
            />
            <TextField
              multiline
              fullWidth
              rows={2}
              margin="dense"
              id="description"
              label="Dataset description"
              type="outlined"
              required={true}
              inputProps={{ minLength: 5 }}
              value={formDescr}
              onChange={e => setFormDescr(e.target.value)}
            />
            <FileUploader
              onFileSelectSuccess={(file) => setSelectedFormFile(file)}
              onFileSelectError={({ error }) => alert(error)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel
            </Button>
            <Button onClick={submitNewDataset} color="primary">
              Submit
            </Button>s
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default withStyles( styles )( UploadDsCard );