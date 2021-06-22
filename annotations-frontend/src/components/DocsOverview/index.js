import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';

// DataGrid docs and examples
// Basic: https://material-ui.com/components/data-grid/rows/
// Columns: https://material-ui.com/components/data-grid/columns/
// Rows: https://material-ui.com/components/data-grid/style/#styling-rows
// Pagination: https://material-ui.com/components/data-grid/pagination/


const DocsOverview = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    const [docs, setDocs] = useState([]);
    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");


    console.log(props);


    const { match: { params } } = props;

    console.log(`Param docs ${params.dsID}`)

    console.log("================================== DocsOverview ======================================");


    // does the job of componentDidMount, componentDidUpdate, componentWillUpdate combined
    useEffect(() => {
        loadDocuments()
    }, []) // Needed [], else we get an infinite loop to the state changing in loadDatasets()



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
          DataService.GetDataset(params.dsID)
          .then(function (resp) {
            console.log(resp.data)
            setPageDesc(resp.data['dataset_description'])
            setPageTitle(resp.data['dataset_name']);
          })
      })
  }



    const columns = [
        { field: 'document_name', type: 'string', width:190 },
        { field: 'updated_at', type: 'date', width:150},
        { field: 'done', type: 'boolean', width:110 },
        { field: 'words', type: 'number', width:120},
        {
            field: 'id',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
              <strong>
                <ButtonGroup fullWidth={true} size="small" color="primary" aria-label="large outlined primary button group">
                    <Button component={Link} to={`/docs_entity/${params.value}`}>Entity</Button>
                    <Button component={Link} to={`/docs_event/${params.value}`}>Event</Button>
                    <Button component={Link} to={`/gen_anno/${params.value}`}>AnnoTest</Button>
                </ButtonGroup>
              </strong>
            ),
          },
          { field: 'Entity Mentions - Iterations', type: 'number', width:120},
          { field: 'Entity Mentions - Agreement', type: 'number', width:120},
          { field: 'Entity (In-Document) Coreference - Iterations', type: 'number', width:120},
          { field: 'Entity Coreference - Agreement', type: 'number', width:120},
          { field: 'Event Mentions - Iterations', type: 'number', width:120},
          { field: 'Event Mentions - Agreement', type: 'number', width:120},
          { field: 'Event (In-Document) Coreference - Iterations', type: 'number', width:120},
          { field: 'Event Coreference - Agreement', type: 'number', width:120},
      ];
      

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
              columns={columns}
              rows={docs}
            />
          </div>
        </div>
    );
};

export default withStyles( styles )( DocsOverview );