import React, {useEffect, useRef, useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import {DataGrid} from "@material-ui/data-grid";
import LaunchSharpIcon from "@material-ui/icons/LaunchSharp";


const DocLevelProgress = ( props ) => {    


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
                        Start <LaunchSharpIcon/>
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

    return (
            <div style={{width: '100%' }}>
                <DataGrid
                    autoHeight={true}
                    columns={colsDocLevel}
                    rows={rowsDocLevel}
                />
            </div>
    );
};

export default DocLevelProgress ;
//export default withStyles( styles )( Progress );