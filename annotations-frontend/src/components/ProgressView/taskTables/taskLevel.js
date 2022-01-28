import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import DataService from "../../../services/DataService";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import LaunchSharpIcon from "@material-ui/icons/LaunchSharp";
//import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';

const TaskLevelProgress = ( props ) => {


    //const { match: { params } } = props;
//    
//    const [docs, setDocs] = useState([]);
//    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
//    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");
//
//
//
//    useEffect(() => {
//        loadDocuments()
//    }, []) 
//
//
//    DataService.GetDocuments(params.dsID)
//        .then(function (response) {
//            setDocs(response.data)
//            console.log(response.data)
//        })
//        .then(function (response) {
//            DataService.GetDataset(params.dsID)
//            .then(function (resp) {
//              console.log(resp.data)
//              setPageDesc(resp.data['dataset_description'])
//              setPageTitle(resp.data['dataset_name']);
//            })
//        })
//    }
//
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
                        Start <LaunchSharpIcon/>
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

    return (
        <div>
            <div style={{width: '100%' }}>
                <DataGrid
                    checkboxSelection={true}
                    autoHeight={true}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20, 100]}
                    // rowOptions={{ selectable: true }}
                    // options={{ onRowSelection: rowClick }}
                    components={{
                        Toolbar: GridToolbar,
                      }}
                    columns={columns}
                    rows={rows}
                />
            </div>
            <Button variant="contained">Add Tasks to Queue</Button>
            </div>
    );
};

export default TaskLevelProgress ;