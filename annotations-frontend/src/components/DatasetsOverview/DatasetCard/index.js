import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DataService from '../../../services/DataService';


import styles from './styles';

// Basic template from:
// https://react.school/material-ui/card
// https://codesandbox.io/s/material-ui-card-examples-bp96w?from-embed=&file=/CardActionsAreaExample.js:457-1003

const DatasetCard = ( props ) => {
    const {classes, ds} = props;
    const [open, setOpen] = React.useState(false);
    //const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      
    };

    const handleClickDelete = (value) => {
      DataService.DeleteDataset(value)
      handleClose()

      
    };


    console.log("================================== DatasetCard ======================================");

    // Component States
    
    return (
    <Card className={classes.root} key={ds.id}>
        <CardContent>

        <Grid container direction="row">
          <Grid item 
                xs
                alignItems="flex-start"
                justify="flex-start">
            <Button component={Link} to={`/progress/${ds.id}`}>
              <Typography gutterBottom variant="h5" component="h2">
                {ds.dataset_name}
                </Typography>
            </Button>
          </Grid>

          <Grid item
                direction="column"
                alignItems="flex-end"
                justify="flex-end">
            <Button variant="outlined" onClick={handleClickOpen}>
              Delete
            </Button>
        
          </Grid>
        </Grid>

        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Are you sure you want to delete the dataset titled {ds.dataset_name}?</DialogTitle>
            <ButtonGroup fullWidth={true} size="large" color="primary" aria-label="large outlined primary button group">
              
                <Button onClick={handleClose}>No</Button>
                <Button onClick={() => handleClickDelete(ds.id)}>Yes</Button>
              </ButtonGroup>
      
        </Dialog>
        <Typography variant="body2" color="textSecondary" component="p">
            {ds.dataset_description}
          </Typography>

          

        <Divider/>
          <div className={classes.footer}>
            {/* 
            
            <Typography className={classes.footerElement}>10%</Typography>
            <Typography className={classes.footerElement}>20%</Typography>
            <Typography className={classes.footerElement}>57%</Typography>
            */}
          </div>
        </CardContent>
        <CardActions>
        <ButtonGroup fullWidth={true} size="large" color="primary" aria-label="large outlined primary button group">
          <Button component={Link} to={`/datasets/${ds.id}`} >InDoc</Button>
          <Button component={Link} to={`/datasets/cross_doc/${ds.id}`}>CrossDoc</Button>
        </ButtonGroup>
        </CardActions>
    </Card>
    );
};

export default withStyles( styles )( DatasetCard );