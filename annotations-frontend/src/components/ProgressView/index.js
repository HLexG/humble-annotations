import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import axios from "axios";
import styles from './styles';
import DataService from "../../services/DataService";
// import { Doughnut } from 'react-chartjs-2';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//import { DoughnutOptions } from '../helpers/DoughnutOptions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DataGrid} from "@material-ui/data-grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Link} from "react-router-dom";

import CircularProgressWithLabel from './charting/circProgressLabelled'
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
        { width: 150, field: 'dn', type: 'string',  headerName: 'Document Name', description: 'tooltip desc'},


        { width: 250,field: "vm", headerName: 'Event Mentions', description: 'Go directly to this task',
            renderCell: (cellValues) => {
                return (
                    <div>
                    {cellValues.value}
                    <Button
                        variant="contained"
                        color="blue"
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
                {cellValues.value}
                <Button
                    variant="contained"
                    color="blue"
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
                {cellValues.value}
                <Button
                    variant="contained"
                    color="blue"
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
                {cellValues.value}
                <Button
                    variant="contained"
                    color="blue"
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
                        color="blue"
                        onClick={(event) => {
                            console.log(event, cellValues);
                        }}
                    >
                        Start
                    </Button>
                );
            }
        },
        { width: 150, field: 'a',  type: 'boolean', headerName: 'Iterations', description: 'tooltip desc'},
        { width: 250, field: 'd',  type: 'number',  headerName: '# of Dependencies', description: 'tooltip desc'},
        { field: 'e', headerName: 'IAA', description: 'tooltip desc',
            renderCell: (cellValues) => {
                return (
                    <Rating name="size-small" defaultValue={2} size="small" />
                );
            }
        },
        
    ];


    const rows = [
        {
            'id':100,
            'dn':'docname',
            'ua':Date(1995, 11, 17),
            'a':true,
            'b':'Entity Coref',
            'c':2,
            'd':3,
            'e':4

        }
    ]



    // Component States
    // <h1 className={classes.headerTextStyle}>{pageTitle} </h1>
    //             <p className={classes.headerTextStyle}>{pageDesc}</p>
    return (
        <div className="Dash">
            <h1 >{pageTitle} </h1>
            <p >{pageDesc}</p>

          <ul>
        {}
      </ul>
            <br />
            <div style={{width: '100%' }}>
                <DataGrid
                    checkboxSelection={true}
                    autoHeight={true}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20, 100]}
                    // rowOptions={{ selectable: true }}
                    // options={{ onRowSelection: rowClick }}
                    columns={columns}
                    rows={rows}
                />
            </div>
            <Button variant="contained">Add Tasks to Queue</Button>


            <div style={{width: '100%' }}>
                <DataGrid
                    //checkboxSelection={true}
                    autoHeight={true}
                    // pageSize={10}
                    // rowsPerPageOptions={[5, 10, 20, 100]}
                    // rowOptions={{ selectable: true }}
                    // options={{ onRowSelection: rowClick }}
                    columns={colsDocLevel}
                    rows={rowsDocLevel}
                />
            </div>

            <CircularProgressWithLabel value={75} />
            <CircularProgressWithLabel value={25} />
            <CircularProgressWithLabel value={33} />
            <CircularProgressWithLabel value={95} />

          


            
        </div>
    );
};

export default Progress ;
//export default withStyles( styles )( Progress );