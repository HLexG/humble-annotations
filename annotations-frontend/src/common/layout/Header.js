import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import { fade } from '@material-ui/core/styles/colorManipulator';
import NativeSelect from '@material-ui/core/NativeSelect';


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 5,
    },
    list: {
        width: 250,
    },
    listItemText:{
        fontSize: "15px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(1) * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1) * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

const Header = props => {

    const [state, setState] = React.useState({
        user: 10,
        
      });
    
    const { classes } = props;

    console.log("================================== Header ======================================");

    // State
    const [drawerOpen, setDrawerOpen] = useState(false);

    let toggleDrawer = (open) => () => {
        setDrawerOpen(open)
    };

    const handleChange = (event) => {
        const user = event.target.user;
        setState({
          ...state,
          [user]: event.target.value,
        });
      };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <span style={{fontFamily: "Ramabhadra, sans-serif",letterSpacing: "3px", fontWeight: 800,lineHeight: 1.33, fontSize: "1.286rem"}} color="inherit" className={classes.grow}>
                    😌 Humble
                    </span>
                    <div className={classes.grow} />
                    <div>
                        <IconButton color="inherit" component={Link} to="/">
                            <Icon>home</Icon>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/dashboard">
                            <Icon>dashboard</Icon>
                        </IconButton>
                        <IconButton aria-haspopup="true" color="inherit">
                            <MoreIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="inherit">
                            <AccountCircle fontSize="small" />
                        </IconButton>

                    </div>
                    <NativeSelect
                                        /*value={state.user}*/
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'u_id',
                                        }}
                                        >
                                        <option value="">None</option>
                                        <option value={10}>Joe</option>
                                        <option value={20}>Eduardo</option>
                                        <option value={30}>Shivas</option>
                                        </NativeSelect>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={toggleDrawer( false)}>
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
                            <ListItem button key='annotations' component={Link} to="/annotations">
                                <ListItemIcon><Icon>dashboard</Icon></ListItemIcon>
                                <ListItemText primary='Annotations' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key='menuitem12' component={Link} to="/dashboard">
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

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);