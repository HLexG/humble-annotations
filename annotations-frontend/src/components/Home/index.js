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
                 console.log("response, home")
                 console.log(response.data[0])
                 // Load the documents
                 //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
                 //return DataService.GetDocuments(response.data[0]["id"])
                 return DataService.GetDocuments(response.data[0])
             })
             .then(function (response) {
                 setDocuments(response);
             })
    }

    const WhiteTextTypography = withStyles({
        root: {
          color: "#FFFFFF"
        }
      })(Typography);

      const WhiteTextTypography2 = withStyles({
        root: {
          color: "#FFFFFF",
          textAlign:"right"
        }
      })(Typography);      

    // Setup Component
    useEffect(() => {
        loadDocuments();
      }, []);
    

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <Card className={classes.card}>
                            <CardContent style={{backgroundImage: "radial-gradient(circle at 50% -20.71%, #e459ea 0, #c84ded 16.67%, #a544f0 33.33%, #783cf2 50%, #2538f4 66.67%, #0039f5 83.33%, #003af6 100%)"}}>
                                <WhiteTextTypography gutterBottom variant="h5" component="h2" color="common.white">
                                    Datasets
                                </WhiteTextTypography>
                                <WhiteTextTypography2 variant="h1" component="h1">
                                    5
                                </WhiteTextTypography2>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardContent style = {{backgroundImage: "radial-gradient(circle at 50% -20.71%, #badbff 0, #c2daff 6.25%, #c9d8ff 12.5%, #d0d6ff 18.75%, #d8d4ff 25%, #dfd2fe 31.25%, #e6d0fa 37.5%, #eccff6 43.75%, #f2cdf2 50%, #f7cced 56.25%, #fccbe8 62.5%, #ffcae2 68.75%, #ffc9dd 75%, #ffc9d7 81.25%, #ffc9d1 87.5%, #ffc9cc 93.75%, #ffcac6 100%)"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Documents Completed
                                </Typography>
                                <WhiteTextTypography2 variant="h1" color="textSecondary" component="p">
                                    24
                                </WhiteTextTypography2>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                        <Card className={classes.card}>
                        <CardContent style={{backgroundImage: "radial-gradient(circle at 50% -20.71%, #ffef37 0, #fff327 7.14%, #fff619 14.29%, #e8f80f 21.43%, #c9f911 28.57%, #a6f81e 35.71%, #7cf62c 42.86%, #3cf23c 50%, #00ee4d 57.14%, #00ea60 64.29%, #00e574 71.43%, #00e18a 78.57%, #00dea1 85.71%, #00dab9 92.86%, #00d8d2 100%)"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Average Inter-Annotator Agreement
                                </Typography>
                                <WhiteTextTypography2 variant="h1" color="textSecondary" component="p">
                                    78%
                                </WhiteTextTypography2>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                        <CardContent style={{backgroundImage: "radial-gradient(circle at 50% -20.71%, #faffff 0, #d8f0fa 25%, #b5def2 50%, #92cbeb 75%, #72b9e5 100%)"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    # Annotations Completed
                                </Typography>
                                <WhiteTextTypography2 variant="h1" color="textSecondary" component="p">
                                    25
                                </WhiteTextTypography2>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className={classes.card}>
                        <CardContent style={{backgroundImage: "radial-gradient(circle at 50% -20.71%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%)"}}>
                                <WhiteTextTypography gutterBottom variant="h5" component="h2">
                                    Dataset List
                                </WhiteTextTypography>
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