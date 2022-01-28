import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import CrossDocCard from './CrossDocCard';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DataService from '../../services/DataService';
import CollapsibleTable from './CrossDocReviewTable';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EventIcon from '@material-ui/icons/Event';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import { DataGrid } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import RoomIcon from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';

const testDatasets = [
  {id: 1, title: 'CeleBERTy', descr: 'Welcome to learning React! Welcome to learning React! Welcome to learning React!'},
  {id: 2, title: 'Apple News', descr: 'You can install React from npm. You can install React from npm. You can install React from npm.'},
  {id: 3, title: 'Harry p', descr: 'You can install React from npm. Welcome to learning React! Welcome to learning React!'}

];

// TODO: Pull out the actual basic info of all the dataset
const datasets = testDatasets;

const CrossDocOverview = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    const { match: { params } } = props;

    console.log("================================== CrossDocOverview ======================================");

    // PAGE DETAILS
    const [pageTitle, setPageTitle] = useState("CeleBERTy dataset ");
    const [pageDesc, setPageDesc] = useState("Some general info about this dataset");
    const [unclaimedEntities, setUnclaimedEntities] = useState([]);
    const [topMentions, setTopMentions] =  useState([]);
    const [mentionReframe, setMentionReframe]=  useState([]);
    const [evRows, setEvRows] =  useState([]);
    const [trows, setTrows] =   useState([]);
    

    //TOGGLE ENTITIES/EVENTS

    const [stateEntityTable, setStateEntityTable] = React.useState(() => ['entities', 'xdocevents']);
  
    const handleTableToggle = (event, newTables) => {
      setStateEntityTable(newTables);
    };



    const tcol = [
      { field: 'mention_name', headerName:"Mention", type: "string", width:190 },
      { field: 'mention_count', type: 'number', headerName: "# Mentions", width:190 },
      {
        field: 'id',
        headerName: 'Actions',
        width: 250,
        renderCell: (params) => (
          <strong>
            <ButtonGroup fullWidth={true} size="small" color="primary" aria-label="large outlined primary button group">
                <Button component={Link} to={`/grounding/${params.value}`}>Ground</Button>
            </ButtonGroup>
          </strong>
        ),
      },

    ]



    

    


    useEffect(() => {
        DataService.GetDataset(params.dsID)
            .then(function (response) {
        console.log(response.data)
        setPageDesc(response.data['dataset_description'])
        setPageTitle(response.data['dataset_name']);
      });
        DataService.GetWDNamedEntities(params.dsID)
            .then(function (response) {
              console.log('getwdNEs')
              console.log(response.data)
              setUnclaimedEntities(response.data)
              setMentionReframe(unclaimedEntities.mentions)
              setTopMentions(mentionReframe)
              setTrows(unclaimedEntities.map(
                (row) => {
                            return {
                              id: row.id,
                              mention_name: row.mentions[0],
                              mention_count: row.mentions.length,
                                }
                              }
                                  )
            
                        )
              

            });
        }, []) 
    return (
        <div className={classes.root}>
          <h1 className={classes.headerTextStyle}>{pageTitle}</h1>
          <p className={classes.headerTextStyle}>{pageDesc}</p>
          <ToggleButtonGroup value={stateEntityTable} onChange={handleTableToggle} aria-label="text formatting">
      <ToggleButton value="entities" aria-label="Entities">
        <NaturePeopleIcon /> Entities
      </ToggleButton>
      <ToggleButton value="xdocevents" aria-label="Events">
        <EventIcon /> Events
      </ToggleButton>
      
    </ToggleButtonGroup>
        <div className={classes.dsButtons}> 
        <Grid container>
        
        <div style={{width: '100%' }}>
            <DataGrid
              autoHeight={true}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20, 100]}
              // rowOptions={{ selectable: true }} 
              // options={{ onRowSelection: rowClick }}
              columns={tcol}
              rows={trows}
            />
          </div>


        </Grid> 


        <Grid container spacing={3}>
    {
      unclaimedEntities.map(row => (
        <Grid item xs={3}>
          <Card className={"MuiElevatedCard--02"}>
            <CardHeader
              className={"MuiCardHeader-root"}
              title={row.id}
              subheader = {row.mentions[0]}
              classes={{
                title: "MuiCardHeader-title",
                subheader: "MuiCardHeader-subheader"
              }}
            />
            <CardActions>
                      <Button color="secondary" aria-label="ground" component={Link} to={{pathname:`/grounding/${row.id}`, state:{'mentions':row.mentions}}}>Ground
                      </Button>
                      </CardActions>
          </Card>
        </Grid>
      ))
    }
    </Grid>
          
        </div></div>
    );
};

export default withStyles( styles )( CrossDocOverview );