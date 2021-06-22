import React from 'react';
import { withStyles } from '@material-ui/core';

const drawerWidth = 240;

// Code to move content with drawer:
// https://stackoverflow.com/a/57866459/8970591
const styles = theme => ({
  root: {
    backgroundColor: "#efedf5",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
    minHeight: "100vh"
  },
  grow: {
    flexGrow: 1,
  },
  menuOpen: {
    marginLeft: '0px'
  },
  menuClosed: {
    marginLeft: drawerWidth,
  }
});


const Content = (props) => {
  const { classes, children, drawerOpen } = props;

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

export default withStyles(styles)(Content);