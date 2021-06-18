import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import DataService from '../../services/DataService';
import Button from '@material-ui/core/Button';

import styles from './styles';






const AnnotationPanel = ( props ) => {
    const {classes} = props;
    const { history } = props;
    const { params } = props;
    let { tokens } = props;
    let { annotations } = props;
    

    console.log("================================== AnnotationPanel ======================================");
    console.log(props);

    const [id , setId] = useState([]);
    const [mentions, setMentions] = useState([]);
    const loadMentions = () => {
        DataService.GetMentions(5)
        .then(function (response) {
            setMentions(response.data)
            console.log(response.data)
            //const datasets = setState(response.data[0])
            // Load the documents
            //return DataService.GetDocumentsForAnnotation(response.data[0]["id"])
        })
        .then(function (response) {
            //setDocuments(response.data);
        })
    }

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
                <Button variant="contained" color="primary" onClick={loadMentions}>
                Load
            </Button>
                <div>
                    <div className={classes.toolstitle}>Mentions:</div>
                    <div>
                    {annotations && annotations["clusters"].map((cluster, index) => 
                        <div key={index}>&nbsp;{cluster.name}</div>
                    )}
                    </div>
                    <div>
                    {mentions.map(i => 
                        <div>&nbsp;{i.id}</div>
                    )}
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default withStyles( styles )( AnnotationPanel );