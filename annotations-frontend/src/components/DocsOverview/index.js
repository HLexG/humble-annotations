import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';
import DocRow from './DocRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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

    console.log(props);


    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== DocsOverview ======================================");


    const rowClick = (event) => {
      const {row} = event;
      console.log(row);

      history.push(`/docs/${row.docID}`);

    }

    // Component States
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>Dataset</h1>
          <p className={classes.headerTextStyle}>Here you can find dataset that you can help to annotate. You can also upload your own dataset so you and your team can start annotating</p>
          <div className={classes.dsButtons}>
            <Button variant="contained" color="primary" className={classes.uploadButton}>
              Upload clean dataset
            </Button>
            <Button variant="contained" color="secondary">
              Upload annotated dataset
            </Button>
          </div>
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