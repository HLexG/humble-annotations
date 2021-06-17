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
  {id: 1, docID: 1, title: 'Ellen DeGeneres to host 2014 Oscars',lastModified:'15/11/2020', done:true, words:10},
  {id: 2, docID: 2, title: 'Lindsay Lohan Leaves Betty Ford',lastModified:'12/01/2021', done:true, words:10},
  {id: 3, docID: 3, title: 'Apple unveils new macbook pro',lastModified:'27/03/2021', done:true, words:10},
];

// TODO: Pull out the actual docs for this dataset
const docs = testDocs;


const DocsOverview = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    const [docs, setDocs] = useState(testDocs);

    console.log(props);


    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== DocsOverview ======================================");


    

    const loadDocuments = () => {
      DataService.GetDocuments(3)
      .then(function (response) {
          setDocs(response.data)
          console.log(response.data)
          //const datasets = setState(response.data[0])
          // Load the documents
          //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
      })
      .then(function (response) {
          //setDocuments(response.data);
      })
  }


    const rowClick = (event) => {
      const {row} = event;
      console.log(row);

      history.push(`/docs/${row.docID}`);

    }

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>CeleBERTy dataset </h1>
          <p className={classes.headerTextStyle}>Some general info about this dataset</p>
          <Button variant="contained" color="primary" className={classes.uploadButton} onClick={loadDocuments}>
              refresh
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
                { field: 'docID', type: 'string', width:120 },
                { field: 'title', type: 'string', width:300 },
                { field: 'lastModified', type: 'date', width:130},
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