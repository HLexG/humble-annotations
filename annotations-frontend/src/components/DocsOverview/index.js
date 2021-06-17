import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';
import DocRow from './DocRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';

// DataGrid docs and examples
// Basic: https://material-ui.com/components/data-grid/rows/
// Columns: https://material-ui.com/components/data-grid/columns/
// Rows: https://material-ui.com/components/data-grid/style/#styling-rows
// Pagination: https://material-ui.com/components/data-grid/pagination/


const testDocs = [
  {id: 1, docID: 1, document_name: 'Ellen DeGeneres to host 2014 Oscars',updated_at:'15/11/2020', done:true, words:10},
  {id: 2, docID: 2, document_name: 'Lindsay Lohan Leaves Betty Ford',updated_at:'12/01/2021', done:true, words:10},
  {id: 3, docID: 3, document_name: 'Apple unveils new macbook pro',updated_at:'27/03/2021', done:true, words:10},
];

// TODO: Pull out the actual docs for this dataset
const docs = testDocs;

const axios = require('axios');


const DocsOverview = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    const [docs, setDocs] = useState(testDocs);
    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");


    console.log(props);


    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== DocsOverview ======================================");

    const preAnno = () => {
        axios({
          method: 'get',
          url: `http://0.0.0.0:9111/v1/process_dataset/${params.dsID}`,
          responseType: 'application/json'
        })
          .then(function (response) {
            console.log('Success!')
          });
    }


    

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
          DataService.GetDatasets(params.dsID)
          .then(function (resp) {
            console.log(resp.data)

            setPageDesc(resp.data[params.dsID-1]['dataset_description'])
            setPageTitle(resp.data[params.dsID-1]['dataset_name']);

          })
      })
  }


    const rowClick = (event) => {
      const {row} = event;
      console.log(row);

      history.push(`/docs/${row.id}`);

    }

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>{pageTitle} </h1>
          <p className={classes.headerTextStyle}>{pageDesc}</p>
          <Button variant="contained" color="primary" className={classes.uploadButton} onClick={loadDocuments}>
              refresh
            </Button>
            <Button variant="contained" color="primary" className={classes.uploadButton} onClick={preAnno}>
              pre anno
            </Button>
          <br />
          <div style={{width: '100%' }}>
            <DataGrid
              autoHeight={true}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20, 100]}
              // rowOptions={{ selectable: true }} 
              // options={{ onRowSelection: rowClick }}
              onRowClick={rowClick}
              columns={[
                { field: 'id', type: 'string', width:120 },
                { field: 'document_name', type: 'string', width:300 },
                { field: 'updated_at', type: 'date', width:130},
                { field: 'done', type: 'boolean', width:120 },
                { field: 'words', type: 'number', width:120},
              ]}
              rows={docs}
            />
          </div>
        </div>
    );
};

export default withStyles( styles )( DocsOverview );