import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
//import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';
import CustomizedDialogs from   './parts/modalDialog';
import SimplePopover from   './parts/popover';


const testDocs = [
  {id: 1, docID: 1, document_name: 'Ellen DeGeneres to host 2014 Oscars',updated_at:'15/11/2020', done:true, words:10},
  {id: 2, docID: 2, document_name: 'Lindsay Lohan Leaves Betty Ford',updated_at:'12/01/2021', done:true, words:10},
  {id: 3, docID: 3, document_name: 'Apple unveils new macbook pro',updated_at:'27/03/2021', done:true, words:10},
];

// TODO: Pull out the actual docs for this dataset
const docs = testDocs;

const axios = require('axios');


const EntityLinking = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log(props);

    const { match: { params } } = props;

    console.log(`Param docs ${params}`)

    console.log("================================== Entity Linking ======================================");

    return (
        <div>
          <h1>Page Title</h1>
          <p>Description</p>
          <br />
          <div style={{width: '100%' }}>
            CustomizedDialogs()
            SimplePopover() 
          </div>
        </div>
    );
};

export default ( EntityLinking );