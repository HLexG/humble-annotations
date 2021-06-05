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

const CardDs = ( props ) => {
    const {classes} = props;

    console.log("================================== CardDs ======================================");

    // Component States
    
    return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          CardActions Example
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          CardActions are just a flexbox component that wraps the children in
          8px of padding and 8px horizontal padding between children.
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

export default withStyles( styles )( CardDs );