import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DataServices from "../../services/DataServices";
import styles from './styles';

const Home = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Home ======================================");

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
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Some metrics here....
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default withStyles( styles )( Home );