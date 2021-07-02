import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DataGrid } from '@material-ui/data-grid';
import DataService from "../../services/DataService";
import styles from './styles';
import {handleAnnotationItemsClick} from './handlers';

const DocStats = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Home ======================================");

    // Component States
    const [dataset , setDataset] = useState("");
    const [datasets , setDatasets] = useState([]);
    const [documents , setDocuments] = useState(null);

    const holderParams = {iters: 42, count: 32 }

    const iterColor = (params) => {
        if (params.value.iters > 2) {
            return 'green'
        } else if (params.value.iters > 0){
            return 'yellow'
        } else {
            return 'red'
        }
    }


    const columns = [
        { field: 'id', headerName: 'Doc', width: 110, renderCell: (params) => (
            <div>
              <Typography>{params.value} <b>Count:</b></Typography>
              <Typography color="textSecondary"><b>Iterations:</b></Typography>
            </div>
          )  },
        {field: 'mentions', headerName: 'Mentions', width: 195, renderCell: (params) => (
            <div style= {{width: '100%',height: '100%', backgroundColor:iterColor(params)}}>
              <Typography>{params.value.count}</Typography>
              <Typography color="textSecondary">{params.value.iters}</Typography>
            </div>
          ) },
        {field: 'idc', headerName: 'In Doc Clusters', width: 245, renderCell: (params) => (
            <div style= {{width: '100%',height: '100%', backgroundColor:iterColor(params)}}>
              <Typography>{params.value.count}</Typography>
              <Typography color="textSecondary">{params.value.iters}</Typography>
            </div>
        ) },
      ];
      
      const rows = [
        { id: 1, mentions: {iters: 3, count: 32 }, idc: {iters: 2, count: 32 } },
        { id: 2, mentions: {iters: 2, count: 32 }, idc: {iters: 0, count: 32 } },
        { id: 3, mentions: {iters: 0, count: 32 }, idc: {iters: 0, count: 32 } },
      ];

      const columns2 = [
        
        {field: 'tcl', headerName: 'Total', width: 150, },
        {field: 'lcl', headerName: 'Linked', width: 200, },
        {field: 'ecl', headerName: 'Evaluated', width: 200, },
      ];
      
      const rows2 = [
        { id: 1, tcl: 23, ecl: 35,lcl: 35,  }
      ];

    const handleChange = (event) => {
        setDataset(event.target.value)
        console.log("current dataset:")
        console.log(dataset)
    };
    const loadDocuments = () => {
         DataService.GetDatasets()
             .then(function (response) {
                setDatasets(response.data); 
                setDataset(response.data[0]);
                 
                 console.log(response)
                 // Load the documents
                 //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
                 //return DataService.GetDocuments(response.data[0]["id"])
                 return DataService.GetDocuments(response.data[0])
             })
             .then(function (response) {
                 setDocuments(response.data);
             })
    }

    const [mentionStats, SetMentionStats] = useState([]);
    const [entityRows, SetEntityRows] = useState([]);
    const [eventRows, SetEventRows] = useState([]);
    const [xDocEvRows, SetXDocEvRows] = useState([]);
    const [xDocEnRows, SetXDocEnRows] = useState([]);

    const loadMentionStats = () => {
        DataService.MentionStats()
            .then(function (response) {
                console.log('---Mention Stats---')
                console.log(response.data)
                SetMentionStats(response.data)
                SetEntityRows(response.data['entity'])
                console.log(entityRows)
                SetEventRows(response.data['event'])
                SetXDocEvRows(response.data['xdoc'])
		SetXDocEnRows(response.data['xdoc'])

        })
    };

    // Setup Component
    useEffect(() => {
        loadDocuments();
        loadMentionStats();
      }, []);
    

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Grid container spacing={2}>

                    <Grid item sm={4}>
                        <Card className={classes.exp}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Explanation
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                            <CardContent>
                            <FormControl className={classes.formControl}>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={dataset}
                                  onChange={handleChange}
                                >
                                  {datasets.map(dset =>(
                                      <MenuItem value={dset}>{dset.dataset_name}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>




                    <Grid item sm={8}>
                        <Grid container spacing={2}>

                            <Grid item sm={12}>
                                <Card className={classes.card}>
                        
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Entities
                                        </Typography>
                                       
                                        <Grid container spacing={2}>

                                            <Grid item sm={6}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            In - Doc
                                        </Typography>
                                                <DataGrid
                                                    autoHeight
                                                    rows={entityRows}
                                                    columns={columns}
                                                    pageSize={5}
                                                    disableSelectionOnClick
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Cross - Doc
                                        </Typography>
                                            <DataGrid
                                                    autoHeight
                                                    rows={rows2}
                                                    columns={columns2}
                                                    pageSize={5}
                                                    disableSelectionOnClick
                                                    rowsPerPageOptions={[]}
                                                    hideFooter={true}
                                                />
                                            </Grid>
                                            </Grid>
                                    </CardContent>
                                </Card>
                                <Grid item sm={12}>
                                    <Card className={classes.card}>
                            
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Events
                                            </Typography>
                                            
                                            <Grid container spacing={2}>

                                                <Grid item sm={6}>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                            In - Doc
                                        </Typography>
                                                <DataGrid
                                                    autoHeight
                                                    rows={eventRows}
                                                    columns={columns}
                                                    pageSize={5}
                                                    disableSelectionOnClick
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Cross - Doc
                                        </Typography>
                                                <DataGrid
                                                    autoHeight
                                                    rows={rows2}
                                                    columns={columns2}
                                                    pageSize={5}
                                                    disableSelectionOnClick
                                                    rowsPerPageOptions={[]}
                                                    hideFooter={true}
                                                />
                                                </Grid>
                                                </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                            </Grid>
                            
                        </Grid>
                        
                    </Grid>
                    

                </Grid>
            </main>
        </div>
    );
};
export default withStyles( styles )( DocStats );
