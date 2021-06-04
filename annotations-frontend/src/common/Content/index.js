import React from 'react';
import { withStyles } from '@material-ui/core';

const drawerWidth = 240;

// Code to move content with drawer:
// https://stackoverflow.com/a/57866459/8970591
const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        height: "100%"
    },
    menuOpen: {
      marginLeft: '0px'
    },
    menuClosed: {
      marginLeft: drawerWidth,
    }
});


const Content = (props) => {
  const { classes, children, drawerOpen} = props;

    console.log("================================== Content ======================================");

    console.log(classes)
    const drawerStatusClass = drawerOpen ? classes.menuClosed : classes.menuOpen
    const contentClasses = `${classes.root} ${drawerStatusClass}`

    return (
        <div className={contentClasses}>
            {children}
        </div>
    );
}

export default withStyles( styles )( Content );