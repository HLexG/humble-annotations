import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';

const Annotation = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Annotation ======================================");

    // Component States
    const [annotationTree, setAnnotationTree] = useState(null);
    const [selectedToken, setSelectedToken] = useState(null);

    // Setup Component

    // Component methods
    const isTokenSelected = (token) => {
        var style = {};
        var selectedStyle = {
            textDecoration: "underline"
        }
        if(selectedToken && (selectedToken.t_id === token.t_id) && (selectedToken.s_id === token.s_id)){
            style = selectedStyle
        }

        return style;
    }

    return (
        <div className={classes.content}>
            Annotation....
            
        </div>
    );
};

export default withStyles( styles )( Annotation );