import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';

import styles from './styles';


const Dashboard = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== Dashboard ======================================");

    // Component States
    return (
        <div className="Dash">
            Dashboard            
            
        </div>
    );
};

export default withStyles( styles )( Dashboard );