import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styles from './styles';
import DataServices from "../../services/DataServices";




const Dashboard = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== Dashboard ======================================");
    
    const [dataset , setDataset] = useState(null);
    const [documents , setDocuments] = useState(null);
    
    const loadDocuments = () => {
        DataServices.GetDatasets()
            .then(function (response) {
                setDataset(response.data[0]);
                // Load the documents
                return DataServices.GetDocumentsForAnnotation(response.data[0]["id"])
            })
            .then(function (response) {
                setDocuments(response.data);
            })
    }

    // Setup Component
    useEffect(() => {
        loadDocuments();
      }, []);
    

    // Component States
    return (
        <div className="Dash">
                   
            <Grid item sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Dashboard - MUC, B3, CEAFe and BLANC, as well as CoNLL and AVG
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                <List component="nav">
                                {documents && documents.map((doc, index) => 
                                    <ListItem key={index}>
                                        <ListItemText primary={doc.document_name} />
                                    </ListItem>  
                                )}
                                </List>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
            
        </div>
    );
};

export default withStyles( styles )( Dashboard );