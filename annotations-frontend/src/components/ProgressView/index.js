import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import axios from "axios";
import styles from './styles';
import DataService from "../../services/DataService";
// import { Doughnut } from 'react-chartjs-2';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import { DoughnutOptions } from '../helpers/DoughnutOptions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DataGrid} from "@material-ui/data-grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Link} from "react-router-dom";

import CircularProgressWithLabel from './charting/circProgressLabelled';


import TaskLevelProgress from './taskTables/taskLevel';
import DocLevelProgress from './taskTables/docLevel';

import TabPanel from './taskTables/tabPanel';



//import CustomizedSteppers  from './charting/progressBar';

//import db from './fb';

//import {handlePullMentions }from "./handlers";
/*
//const axios = require('axios');
var admin = require("firebase-admin");

var serviceAccount = require("./hlexg-63f51-firebase-adminsdk-sowzl-31be6ac6ff.json");
*/
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var srvcURL = 'firebase-adminsdk-sowzl@hlexg-63f51.iam.gserviceaccount.com'

//let query = firestore.collection('mentions').where('foo', '==', 'bar');


const fbPull = async () =>{
  let query = firestore.collection('mentions');
  query.get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      console.log(`Found document at ${documentSnapshot.ref.path}`);
    });
  });};*/


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}  

const Progress = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== Progress View ======================================");
    console.log(props);


    const { match: { params } } = props;
    
    const [dataset , setDataset] = useState(null);
    const [documents , setDocuments] = useState(null);
    const [docs, setDocs] = useState([]);
    const [document , setDocument] = useState(null);
    const [setTokens] = useState([]);
    const [setAnnotations] = useState(null);
    const [mentions , setMentions] = useState([]);

    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");



    useEffect(() => {
        loadDocuments()
    }, []) 


    const loadDocuments = () => {
        DataService.GetDocuments(params.dsID)
        .then(function (response) {
            setDocs(response.data)
            console.log(response.data)
            //const datasets = setState(response.data[0])
            // Load the documents
            //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
        })
        .then(function (response) {
            //setDocuments(response.data);
            DataService.GetDataset(params.dsID)
            .then(function (resp) {
              console.log(resp.data)
              setPageDesc(resp.data['dataset_description'])
              setPageTitle(resp.data['dataset_name']);
            })
        })
    }




    // Setup Component
/*
    useEffect(() => {
        handlePullMentions();
      }, []);
    
      const handlePullMentions = async () => {
        /*
        const response = await axios.get('http://0.0.0.0:9000/v1/mentions?dataset_id=1');
        setMentions(response.data);
        console.log('ran');
        */
/*
        let query = db.collection('mentions');

        let qOuts = await query.get();
        
        for(const doc of qOuts.docs){
          console.log(doc.data());
          setMentions(doc.data());
        }
        };
*/

 //   const loadDataset = () => {
 //       DataService.GetProgressData(params.dsID)
 //           .then(function (response) {
 //               //setDocs(response.data)
 //               console.log(response.data)
  //              //const datasets = setState(response.data[0])
   //             // Load the documents
 //               //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
       //     })
     //       .then(function (response) {
                //setDocuments(response.data);
         //       DataService.GetDataset(params.dsID)
           //         .then(function (resp) {
             //  //         console.log(resp.data)
                   //     setPageDesc(resp.data['dataset_description'])
               //         setPageTitle(resp.data['dataset_name']);
                   // })
           // })
    //}

    const colsDocLevel = [
        { width: 150, field: 'id', type: 'number',  headerName: 'id test', description: 'tooltip desc', hide: true},
        { width: 250, field: 'dn', type: 'string',  headerName: 'Document Name', description: 'tooltip desc'},


        { width: 250,field: "vm", headerName: 'Event Mentions', description: 'Go directly to this task',
            renderCell: (cellValues) => {
                return (
                    <div>
                    {cellValues.value}{" Iterations "}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(event) => {
                            console.log(event, cellValues);
                        }}
                    >
                        Start
                    </Button>
                    </div>
                );
            }
        },
        { width: 250, field: 'vc', headerName: 'Event Coref', description: 'tooltip desc',
        renderCell: (cellValues) => {
            return (
                <div>
                {cellValues.value}{" Iterations "}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={(event) => {
                        console.log(event, cellValues);
                    }}
                >
                    Start
                </Button>
                </div>
            );
        }
    },
        { width: 250, field: 'nm', headerName: 'Entity Mentions', description: 'tooltip desc',
        renderCell: (cellValues) => {
            return (
                <div>
                {cellValues.value}{" Iterations "}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={(event) => {
                        console.log(event, cellValues);
                    }}
                >
                    Start
                </Button>
                </div>
            );
        }
    },
        { width: 250, field: 'nc', headerName: 'Entity Coref', description: 'tooltip desc',
        renderCell: (cellValues) => {
            return (
                <div>
                {cellValues.value}{" Iterations "}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={(event) => {
                        console.log(event, cellValues);
                    }}
                >
                    Start
                </Button>
                </div>
            );
        }
    },

    ]

    const rowsDocLevel = [
        {'id': 1,'dn':'Document A', 'vm':3, 'vc':2, 'nm':1, 'nc':1},
        {'id': 2,'dn':'Document B', 'vm':5, 'vc':1, 'nm':2, 'nc':0},
        {'id': 3,'dn':'Document C', 'vm':6, 'vc':4, 'nm':4, 'nc':3}
    ]



    const columns = [
        { width: 150, field: 'id', type: 'number',  headerName: 'id test', description: 'tooltip desc', hide: true},
        { width: 150, field: 'dn', type: 'string',  headerName: 'Document', description: 'tooltip desc'},
        { width: 150, field: 'c',  type: 'number',  headerName: 'Priority', description: 'tooltip desc'},
        { width: 150, field: 'b',  type: 'string',  headerName: 'Task', description: 'tooltip desc'},
        { width: 250, field: 'ua', type: 'date',    headerName: 'Last Updated', description: 'tooltip desc'},
        { field: "Start", headerName: ' ', description: 'Go directly to this task',
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(event) => {
                            console.log(event, cellValues);
                        }}
                    >
                        Start
                    </Button>
                );
            }
        },
        { width: 150, field: 'a',  type: 'number', headerName: 'Iterations', description: 'tooltip desc'},
        { width: 250, field: 'd',  type: 'number',  headerName: '# of Dependencies', description: 'tooltip desc'},
        { field: 'e', headerName: 'IAA', description: 'tooltip desc',type: 'number',valueFormatter: (params) => {
            const valueFormatted = Number(params.value * 100).toLocaleString();
            return `${valueFormatted} %`;
          },
          valueParser: (value) => Number(value) / 100,
        },
        
    ];


    const rows = [
        {
            'id':1,
            'dn':'Document A',
            'ua':new Date(2021, 11, 17),
            'a':0,
            'b':'Entity Mentions',
            'c':1,
            'd':3,
            'e':0

        },
        {
            'id':2,
            'dn':'Document A',
            'ua':new Date(2021, 9, 17),
            'a':1,
            'b':'Event Mentions',
            'c':2,
            'd':3,
            'e':1

        }, 
        {
            'id':3,
            'dn':'Document B',
            'ua':new Date(2021, 9, 17),
            'a':0,
            'b':'Event Coreference',
            'c':3,
            'd':3,
            'e':.0

        }, 
        {
            'id':4,
            'dn':'Document B',
            'ua':new Date(2021, 9, 17),
            'a':2,
            'b':'Entity Coreference',
            'c':4,
            'd':3,
            'e':.75

        }, 
        {
            'id':5,
            'dn':'Document C',
            'ua':new Date(2021, 9, 17),
            'a':3,
            'b':'Event Coreference',
            'c':5,
            'd':3,
            'e':.8

        }
    ]

    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const HeadTextTypography = withStyles({
        root: {
          color: "#A51C30"
        }
      })(Typography);

      const DescTextTypography = withStyles({
        root: {
          color: "#95b5df"
        }
      })(Typography);

    return (
        <div className="Dash">

        <HeadTextTypography gutterBottom variant="h4" component="h2" color="common.white">
            {pageTitle}
            </HeadTextTypography>
        
        <DescTextTypography gutterBottom variant="p" component="h2" color="common.white">
            {pageDesc}
            </DescTextTypography>
            

          <ul/>



          <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Document Level View" {...a11yProps(0)} />
            <Tab label="Task Level View" {...a11yProps(1)} />
            <Tab label="Summary" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DocLevelProgress/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TaskLevelProgress/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
            
            <div style={{height: '150px' }}> </div>

            
            
        </div>
    );
};

export default Progress ;
//export default withStyles( styles )( Progress );