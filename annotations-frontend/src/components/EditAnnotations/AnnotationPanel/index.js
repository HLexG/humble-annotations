import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import DataService from '../../../services/DataService';
import styles from './styles';

const AnnotationPanel = (props) => {
    const { classes } = props;
    const { document } = props;
    const { mentionAnnotations } = props;
    const { handleSetMentionAnnotation } = props;
    const { handleCopyMentionAnnotation } = props;

    // Component States


    // Setup Component
    useEffect(() => {

    }, []);

    // Handlers
    const handleViewMention = (men) => {
        handleSetMentionAnnotation(men);
    }
    const handleCopyMention = (men) => {
        handleCopyMentionAnnotation(men);
    }

    return (
        <div className={classes.toolspanel}>
            <Typography className={classes.toolstitle}>
                Mentions
            </Typography>
            <List className={classes.annotationReferences}>
                {mentionAnnotations && mentionAnnotations.length > 0 && mentionAnnotations.map((men, index) =>
                    <ListItem key={index} className={classes.annotationReferenceItems}>
                        <Typography>
                            {men.username}
                        </Typography>
                        <div className={classes.grow}></div>
                        <IconButton edge="end" onClick={() => handleViewMention(men)}>
                            <Icon>visibility</Icon>
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleCopyMention(men)}>
                            <Icon>content_copy</Icon>
                        </IconButton>
                    </ListItem>
                )}
            </List>
        </div>
    );
};

export default withStyles(styles)(AnnotationPanel);