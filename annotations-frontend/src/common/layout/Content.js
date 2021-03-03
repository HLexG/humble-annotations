import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        height: "100%"
    },
});

const Content = props => {
    const classes = props.classes;

    const children = props.children;

    console.log("================================== Content ======================================");

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}

export default withStyles( styles )( Content );