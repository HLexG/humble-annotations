import React from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import { useAuthContext} from "../../services/AuthService";
import styles from './styles';


// For testing
const testCurrentDatasets = [
  {id: 1, title: 'Celeberty', descr: 'Welcome to learning React!'},
  {id: 2, title: 'Apple News', descr: 'You can install React from npm.'}
]

// TODO: Pull out the actual basic info of all the dataset
const currentDatasets = testCurrentDatasets;

const SideMenu = (props) => {
    const { classes, toggleDrawer, drawerOpen} = props;
    console.log(props);
    console.log("================================== Header ======================================");

    // Get Auth Context
    const auth = useAuthContext();
    // console.log(currentDatasets)

    // https://stackoverflow.com/questions/51085379/material-ui-drawer-with-expandable-side-menu
    const [openCollapse, setOpenCollapse] = React.useState(false);    

    function handleOpenSettings(){
       setOpenCollapse(!openCollapse);
    }

    
    return (
        <div className={classes.root}>
            <Drawer 
              open={drawerOpen} 
              onClose={toggleDrawer(false)}
              BackdropProps={{ invisible: true }}
              >
              <div className={classes.list}>
                  <ListItem button component={Link} to="/">
                    <ListItemText primary="Humble NLP" />
                  </ListItem>
                  <Divider />
                  <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button onClick={handleOpenSettings}>
                    <ListItemIcon>
                      <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Annotations" />
                    {openCollapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {currentDatasets.map(ds => {
                      return (
                        <ListItem 
                          button 
                          key={ds.id}
                          className={classes.nested}
                          component={Link} 
                          to="/" 
                          onClick={toggleDrawer(false)}
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText key={ds.id} primary={ds.title} />
                        </ListItem>
                      );
                    })}
                    </List>
                  </Collapse>
                  <ListItem button component={Link} to="/datasets" onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      <FolderOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Datasets" />
                  </ListItem>
                  <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      <DataUsageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Resources" />
                  </ListItem>

              </div>
            </Drawer>
        </div>
    );
}

export default withStyles( styles )( SideMenu );