import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import Grid from '@material-ui/core/Grid';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';

import Paper from '@material-ui/core/Paper';
import CardHeader from "@material-ui/core/CardHeader";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import yellow from '@material-ui/core/colors/yellow';


import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//import 'exNature.jpeg';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { fontFamily, fontSize, maxWidth } from '@material-ui/system';

import EventCard from './eventCard';


const theme = createTheme({
    status: {
        danger: '#e53e3e',
      },
  palette: {
    primary: {
      main: "#81c784",
    },
    secondary: {
      main: "#c51162",
    },
    error: {
        main: "#f9a825",
    },
    warning: {
        main: "#ffb74d"
    },
    info: {
        main: "#2196f3",
    },
    success: {
        main: "#607d8b",
    },
    
  }
});

const useStyles = makeStyles(theme => ({
    topTitleText: {
        fontSize: "2.25rem",
        fontFamily: "Inter Variable",
        //fontWeight: "500",
        letterSpacing: "0.0075em",
        color: theme.palette.secondary.main
    }
}));


const testDocs = [
  {id: 1, docID: 1, document_name: 'Ellen DeGeneres to host 2014 Oscars',updated_at:'15/11/2020', done:true, words:10},
  {id: 2, docID: 2, document_name: 'Lindsay Lohan Leaves Betty Ford',updated_at:'12/01/2021', done:true, words:10},
  {id: 3, docID: 3, document_name: 'Apple unveils new macbook pro',updated_at:'27/03/2021', done:true, words:10},
];



const docs = testDocs;

const axios = require('axios');


const CrossDoc = ( props ) => {
    const classes = useStyles();

    
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log(props);

    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== Cross Doc ======================================");

    const handleClickCorrect = () => {
        console.info('You clicked the Yes Chip.');
      };
    
    const handleClickIncorrect = () => {
        console.info('You clicked the No Chip.');
      };

      const handleClickNext = () => {
        console.info('You clicked the Next Chip.');
      };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
        <div className={classes.root}>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            
            <EventCard/>
          </Grid>
          
          <Grid item xs>
          <Card className={classes.root} style={{maxWidth: "30vw"}}>
      <CardActionArea>
        <CardContent>
          <div style={{fontSize: "50px", fontFamily: "Inter Variable"}}>{"Are these the same event?"}</div>
            
          <div style={{fontSize: "20px", fontFamily: "Inter Variable"}}>
           Same People, Place, and Time
            </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip
        icon={<AddCircleOutlineIcon/>}
        label="Same"
        color="primary"
        onClick={handleClickCorrect}
        />
        <Chip
        icon={<BlockIcon/>}
        label="Different"
        clickable
        color="secondary"
        onClick={handleClickIncorrect}
      />
      <Chip
        icon={<ArrowForwardIcon/>}
        label="Next"
        clickable
        status="danger"
        onClick={handleClickNext}
      />
      </CardActions>
    </Card>
          </Grid>
          <Grid item xs={4}>
            <EventCard/>
          </Grid>
        </Grid>
        
      </div>
      </React.Fragment>
      </ThemeProvider>
    );
};

export default ( CrossDoc );