import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';

import styles from './styles';

const AnnotationPanel = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== AnnotationPanel ======================================");

    // Component States
    return (
        <div className={classes.toolspanel}>
            <div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Icon>search</Icon>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div>
                    <div className={classes.toolstitle}>Mentions:</div>
                    <div>
                    {annotations && annotations["clusters"].map((cluster, index) => 
                        <div key={index}>&nbsp;{cluster.name}</div>
                    )}
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default withStyles( styles )( AnnotationPanel );