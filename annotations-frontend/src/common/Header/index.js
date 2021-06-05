import React,{ useState } from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
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
    const { classes, toggleDrawer} = props;
    console.log(props);
    console.log("================================== Header ======================================");

    // Get Auth Context
    const auth = useAuthContext();
    console.log(auth)

    // State
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
        </div>
    );
}

export default withStyles( styles )( Header );