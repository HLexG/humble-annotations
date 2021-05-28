import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import { useAuthContext} from "../../../services/AuthService";
import styles from './styles';

const SettingsMenu = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { page } = props;

    console.log("================================== SettingsMenu ======================================");

    // Get Auth Context
    const auth = useAuthContext();
    let display_name = "";
    if(auth.state.full_name){
      display_name = auth.state.full_name;
    }else{
      display_name = auth.state.username;
    }

    // Get initials
    let initials = display_name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    initials = initials.join('');
    initials = initials.toUpperCase();

    return (
        <div>
          <Box display="flex">
            <Avatar className={classes.avatar} variant="square">{initials}</Avatar>
            <Typography variant="h6" className={classes.avatarText}>
              {display_name}
            </Typography>
          </Box>
          <MenuList>
            <MenuItem selected={page=='profile'} component={Link} to="/settings/profile">Profile</MenuItem>
            <Divider />
            <MenuItem selected={page=='account'} component={Link} to="/settings/account">Account</MenuItem>
            <Divider />
            <MenuItem selected={page=='logout'} component={Link} to="/logout">Logout</MenuItem>
          </MenuList>
        </div>
    );
};

export default withStyles( styles )( SettingsMenu );