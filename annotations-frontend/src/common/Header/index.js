import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import { useAuthContext} from "../../services/AuthService";
import styles from './styles';

const Header = (props) => {
    const { classes, toggleDrawer, drawerOpen} = props;
    console.log(props);
    console.log("================================== Header ======================================");

    // Get Auth Context
    const auth = useAuthContext();
    console.log(auth)

    // State
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);

    const openSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(event.currentTarget);
    };
    const closeSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className={classes.appLink}>
                        <Typography className={classes.appTitle} >
                        😌 Humble
                        </Typography>
                    </Link>
                    
                    <div className={classes.grow} />
                    
                    
                    <div>
                        <IconButton color="inherit" component={Link} to="/">
                            <Icon>list</Icon>
                            <Typography variant="caption">&nbsp;Datasets</Typography>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/">
                            <Icon>list</Icon>
                            <Typography variant="caption">&nbsp;Resources</Typography>
                        </IconButton>
                        <IconButton aria-haspopup="true" color="inherit">
                            <Icon>more_vert</Icon>
                        </IconButton>
                        
                        {auth.state.isAuthenticated &&
                            <IconButton color="inherit" onClick={openSettingsMenu}>
                                <AccountCircle fontSize="small" />
                            </IconButton>
                        }
                        {auth.state.isAuthenticated && 
                            <Menu
                                anchorEl={settingsMenuAnchorEl}
                                keepMounted
                                open={Boolean(settingsMenuAnchorEl)}
                                onClose={closeSettingsMenu}
                            >
                            <MenuItem component={Link} to="/settings/profile" onClick={closeSettingsMenu}>Settings</MenuItem>
                            <Divider />
                            <MenuItem component={Link} to="/logout" onClick={closeSettingsMenu}>Logout</MenuItem>
                            </Menu>
                        }
                        {!auth.state.isAuthenticated &&
                            <IconButton color="inherit" component={Link} to="/login">
                                <Icon>login</Icon>
                                <Typography variant="caption">&nbsp;Login</Typography>
                            </IconButton>
                        }
                        {!auth.state.isAuthenticated &&
                            <IconButton color="inherit" component={Link} to="/signup">
                                <Icon>person_add_alt</Icon>
                                <Typography variant="caption">&nbsp;Sign up</Typography>
                            </IconButton>
                        }
                        
                    </div>
                </Toolbar>
            </AppBar>
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

export default withStyles( styles )( Header );