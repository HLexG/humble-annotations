import React from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import { useAuthContext} from "../../services/AuthService";
import styles from './styles';

const SideMenu = (props) => {
    const { classes, toggleDrawer, drawerOpen} = props;
    console.log(props);
    console.log("================================== Header ======================================");

    // Get Auth Context
    const auth = useAuthContext();
    console.log(auth)

    return (
        <div className={classes.root}>
            <Drawer 
              open={drawerOpen} 
              onClose={toggleDrawer(false)}
              BackdropProps={{ invisible: true }}
              >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <div className={classes.list}>
                        <List>
                            <ListItem button key='home' component={Link} to="/">
                                <ListItemIcon><Icon>home</Icon></ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key='menuitem12' component={Link} to="/settings/profile">
                                <ListItemIcon><Icon>settings_applications</Icon></ListItemIcon>
                                <ListItemText primary='Settings' />
                            </ListItem>
                            
                        </List>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default withStyles( styles )( SideMenu );