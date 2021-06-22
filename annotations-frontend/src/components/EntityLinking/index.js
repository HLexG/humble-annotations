import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import Grid from '@material-ui/core/Grid';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';
import CustomizedDialogs from   './parts/modalDialog';
import Paper from '@material-ui/core/Paper';
import CardHeader from "@material-ui/core/CardHeader";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



import SimplePopover from   './parts/popover';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import im from './img/nat.png';
//import 'exNature.jpeg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { fontFamily, fontSize, maxWidth } from '@material-ui/system';


import SupportText from '../CrossDoc/eventFill';


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





const EntityLinking = ( props ) => {
    const classes = useStyles();

    
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log(props);

    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== Entity Linking ======================================");


    

    //console.log("================================== Entity Linking ======================================");


    


    const handleClickCorrect = () => {
        console.info('You clicked the Yes Chip.');
      };
    
    const handleClickIncorrect = () => {
        console.info('You clicked the No Chip.');
      };

      const [id, setId] = useState('Q1470929');
      const [summary, setSummary] = useState([]);
      const [supportiveText , setSupportiveText] = useState([]);
      const loadWikiSum = (id) => {
        console.log("start loadDocument")
        DataService.GetWDSummary(id)
            .then(function (response) {
                setSummary(response.data);
                //console.log(`Token data: ${JSON.stringify(response['data']['tokens'])}`)
                console.log(`sum. data: ${JSON.stringify(summary)}`)
      
            });
      }

      const loadDocSupport = () => {
        console.log("start loadDocSupport")
        DataService.GetCDECRSupport(4)
            .then(function (response) {
              console.log("response")
              console.log(response.data)
                setSupportiveText(response.data);
                console.log("supportiveText")
                console.log(supportiveText)
  
               
            });
    }
      
      useEffect(() => {
        
         loadWikiSum(id);
         loadDocSupport();
      }, []); 
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
        <div className={classes.root}>

        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper} style={{minHeight: "800px"}}>
                Additional Referents
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} style={{minHeight: "800px"}}>
            {supportiveText &&  <SupportText supportiveText={supportiveText}></SupportText>}
            </Paper>
          </Grid>
          <Grid item xs>
          <Card className={classes.root} style={{maxWidth: "30vw"}}>
      <CardActionArea>
      <CardMedia>
          <img src={'https://img.favpng.com/23/11/22/wikidata-scalable-vector-graphics-logo-wikimedia-foundation-wikimedia-project-png-favpng-YTaqyqL8zinPmRTYiLBQkG7fX.jpg'} style = {{maxWidth: "30vw"}}/>
      </CardMedia>
        <CardContent>
          <div style={{fontSize: "50px", fontFamily: "Inter Variable"}}>{summary.entity_name}</div>
            
          <div style={{fontSize: "20px", fontFamily: "Inter Variable"}}>
            {summary.description}
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
      </CardActions>
    </Card>
          </Grid>
        </Grid>
        
      </div>
      </React.Fragment>
      </ThemeProvider>
    );
};

export default ( EntityLinking );