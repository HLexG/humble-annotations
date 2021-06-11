import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import styles from './styles';

// Basic template from:
// https://react.school/material-ui/card
// https://codesandbox.io/s/material-ui-card-examples-bp96w?from-embed=&file=/CardActionsAreaExample.js:457-1003

const DatasetCard = ( props ) => {
    const {classes, ds} = props;

    console.log("================================== DatasetCard ======================================");

    // Component States
    
    return (
    <Card className={classes.root} key={ds.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {ds.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {ds.descr}
        </Typography>
        <Divider/>
        <div className={classes.footer}>
          <Typography className={classes.footerElement}>10%</Typography>
          <Typography className={classes.footerElement}>20%</Typography>
          <Typography className={classes.footerElement}>57%</Typography>

        </div>
      </CardContent>
    </Card>
    );
};

export default withStyles( styles )( DatasetCard );