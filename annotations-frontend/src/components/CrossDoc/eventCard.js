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

import Divider from '@material-ui/core/Divider';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


//import 'exNature.jpeg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { fontFamily, fontSize, maxWidth } from '@material-ui/system';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#81c784"
    },
    secondary: {
      main: "#c51162"
    },
    danger: {
        main: "#f44336"
    },
    neutral: {
        main: "#bcaaa4"
    }, 
    error: {
        main: "#f9a825"
    },
    success: {
        main: "#607d8b"
    },
    info: {
        main: "#2196f3"
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


const EventCard = ( props ) => {
    const classes = useStyles();

    // power using /Users/joebrucker/humble-annotations/api-service/dataaccess/events.py

    
    //const { history } = props;
    //let { tokens } = props;
    //let { annotations } = props;

    //console.log(props);

    //const { match: { params } } = props;

    //console.log(`Param docs ${params}`)

    //console.log("================================== Entity Linking ======================================");



    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
        <div>

        <Grid container>
          <Grid item >
            <Paper className={classes.paper} style={{minHeight: "800px"}}>
            <header>Event 1</header>
            <Divider />
            <header>Related Entities</header>
            <div>Entity 1</div><div>Entity 2</div><div>Entity 3</div>

            <Divider />
                <header>Mentions</header>
                <Divider />
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          "These days, Mr. Sanders <b>said</b>, Republicans are out of touch with diverse metropolitan areas." <br/> <br/>
          "He <b>said</b>, Republicans appeared to lack “real solutions” to issues like crime, and lamented the party’s exclusionary message that drives off young people, Hispanics and gay voters in cities like his." <br/> <br/>
          "“I don’t think the right has kept up with the times,’’ Mr. Sanders, 70, <b>told</b> us in an interview. "
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
          
          
        
        </Paper>
        </Grid>
          </Grid>
      </div>
      </React.Fragment>
      </ThemeProvider>
    );
};

export default ( EventCard );