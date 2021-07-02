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
import {MuiThemeProvider} from '@material-ui/core/styles';
import MyTheme from './MyTheme';




import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';



import SupportText from './elFill';



const useStyles = makeStyles(Theme => ({
    topTitleText: {
        fontSize: "2.25rem",
        fontFamily: "Inter Variable",
        //fontWeight: "500",
        letterSpacing: "0.0075em",
        color: Theme.palette.secondary.main
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
    console.log(props)

    const { match: { params } } = props;

    console.log(`Param docs ${params.cluster_id}`)
    console.log(`Params ${params}`)

    const nounPhrases = props.location.state;
    console.log(nounPhrases)

    console.log("================================== Entity Linking ======================================");


    

    //console.log("================================== Entity Linking ======================================");


    
    const loadingSumPlaceholder = {
      'title': "Loading....",
      'summary': "Loading..."
    }

    const handleClickCorrect = () => {
        console.info('You clicked the Yes Chip.');
        DataService.PostWDClusterPair(params.cluster_id, summary.pageid, currentDoc, url)
        console.info('cluster_id')
        console.info(params.cluster_id)
        console.info('pageid')
        console.info(summary.pageid)
        console.info('doc_id')
        console.info(currentDoc)
        console.info('url')
        console.info(url)
        // add to db
      };
    
    const handleClickIncorrect = () => {
        console.info('You clicked the No Chip.');
      };
    
    

      const [id, setId] = useState('Q1470929');
      const [summary, setSummary] = useState([]);
      const [countVal, setCountVal] = useState(0);
      //const [supportiveText , setSupportiveText] = useState([]);
      const [supportiveTextGroup , setSupportiveTextGroup] = useState([]);
//      const loadWikiSum = (id) => {
//        console.log("start loadDocument")
//        DataService.GetWDSummary(id)
//            .then(function (response) {
//                setSummary(response.data);
//                //console.log(`Token data: ${JSON.stringify(response['data']['tokens'])}`)
//                console.log(`sum. data: ${JSON.stringify(summary)}`)
//      
//            });
//      }
    const handleCountClick = () => {
      setCountVal(countVal+1);

      console.info(countVal);
      loadWikiCandidates();
    };

    const [imgsrc, setImgSrc] = useState('https://img.favpng.com/23/11/22/wikidata-scalable-vector-graphics-logo-wikimedia-foundation-wikimedia-project-png-favpng-YTaqyqL8zinPmRTYiLBQkG7fX.jpg');
    const [url, setUrl] = useState('https://img.favpng.com/23/11/22/wikidata-scalable-vector-graphics-logo-wikimedia-foundation-wikimedia-project-png-favpng-YTaqyqL8zinPmRTYiLBQkG7fX.jpg');
    const inputqry = " ".concat(nounPhrases['mentions'][countVal])
    const loadWikiCandidates = () => {
        console.log('start wiki candidates')
        DataService.GetWDCandidates(inputqry)
          .then(function (response) {
          console.log("wd response")
          console.log(response)

            setSummary(response.data[0]);
            console.log("wd summary")
            console.log(summary)
            setUrl(summary.url);
            
			
			setImgSrc(response.data[countVal].images[0])
            

           
        });
      }

      const[currentDoc, SetCurrentDoc] = useState(0);

      const loadDocSupport = () => {
        console.log("start loadDocSupport")
        DataService.GetCDECRSupport(params.cluster_id)
            .then(function (response) {
              console.log("GetCDECRSupport response")
              console.log(response.data[0][0]['document_id'])
              SetCurrentDoc(response.data[0][0]['document_id'])
                setSupportiveTextGroup(response.data);
                console.log("supportiveText")
                console.log(supportiveTextGroup['nodes'])
  
               
            });
    }
      
      useEffect(() => {
        
        loadWikiCandidates();
         loadDocSupport();
      }, []); 
    return (
      <MuiThemeProvider theme={MyTheme}>

        <div className={classes.root} style = {{paddingTop: '8vh', paddingLeft:'2.4vw'}}>

        <Grid container spacing={2} style = {{position: 'absolute'}}>

          <Grid item xs={6} style = {{top: '50%'}}>
          <div style={{fontSize: "50px", fontFamily: "Inter Variable", paddingBottom: '40px'}}>Cluster<b> Mentions</b></div>

          {
      supportiveTextGroup.map(supportiveText => (
          <div style = {{fontSize: "16px", fontFamily: "Inter Variable",paddingBottom: "30px", maxWidth: "40vw"}}>
            
            {supportiveText &&  <SupportText supportiveText={supportiveText}></SupportText>}
            </div>))}
          </Grid>
          <Grid item xs  style={{maxWidth: "40vw", justify: 'right', left: '90%'}}>
          <Card className={classes.root}>
      <CardActionArea>
      <CardMedia style = {{textAlign: 'center'}}>
          <img src={imgsrc} style = {{maxHeight: '40vh'}}/>
      </CardMedia>
        <CardContent>
          <div style={{fontSize: "50px", fontFamily: "Inter Variable",paddingBottom: '40px'}}>{summary.title}</div>
            
          <div style={{fontSize: "14px", fontFamily: "Inter Variable", textOverflow: 'ellipsis', height: '150px', overflow: 'scroll', lineHeight: 1.5}} className={classes.writing}>
            {summary.summary}
            </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      <Button variant="contained" style={MyTheme.palette.confirm} onClick={handleClickCorrect}>Same</Button>
      <Button variant="contained" style={MyTheme.palette.unknown}>Unsure</Button>
      <Button variant="contained" style={MyTheme.palette.deny} onClick={handleClickIncorrect}>Different</Button>
      <Button variant="contained" style={MyTheme.palette.deny} onClick={handleCountClick}>Next</Button>
      </CardActions>
    </Card>
          </Grid>
        </Grid>
        
      </div>
      </MuiThemeProvider>
    );
};

export default ( EntityLinking );