import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import DataService from "../../services/DataService";
import styles from './styles';
import {handleAnnotationItemsClick} from './handlers';

const Home = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Home ======================================");

    // Component States
    const [dataset , setDataset] = useState(null);
    const [documents , setDocuments] = useState(null);
    const loadDocuments = () => {
         DataService.GetDatasets()
             .then(function (response) {
                 setDataset(response.data[0]);
                 console.log(response.data[0])
                 // Load the documents
                 //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
                 return DataService.GetDocuments(response.data[0]["id"])
             })
             .then(function (response) {
                 setDocuments(response.data);
             })
    }

    // Setup Component
    useEffect(() => {
        loadDocuments();
      }, []);
    

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    # Annotations Completed
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    # Annotations Completed
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    # Annotations Completed
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    # Annotations Completed
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Annotations Tasks
                                </Typography>
                                <List component="nav">
                                {documents && documents.map((doc, index) => 
                                    <ListItem key={index} button onClick={(e) => handleAnnotationItemsClick(doc.id,history)}>
                                        <ListItemText primary={doc.document_name} />
                                    </ListItem>  
                                )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default withStyles( styles )( Home );