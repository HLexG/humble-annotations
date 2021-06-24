import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { useAuthContext } from "../../../services/AuthService";
import styles from './styles';

const AnnotationPanel = (props) => {
    const { classes } = props;
    const { document } = props;
    const { mentionAnnotations } = props;
    const { mentionAnnotation } = props;
    const { handleSetMentionAnnotation } = props;
    const { handleCopyMentionAnnotation } = props;

    const auth = useAuthContext();

    // Component States


    // Setup Component
    useEffect(() => {

    }, []);

    // Function
    const isMentionSelected = (men) => {
        let style = {};
        if (mentionAnnotation && (men.id == mentionAnnotation.id)) {
            style = { backgroundColor: "#dcdcdc" };
        }

        return style
    }

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
                    <ListItem
                        key={index}
                        className={classes.annotationReferenceItems}
                        style={isMentionSelected(men)}
                    >
                        <Typography>
                            {men.username}
                        </Typography>
                        <div className={classes.grow}></div>
                        <IconButton edge="end" onClick={() => handleViewMention(men)}>
                            <Icon>visibility</Icon>
                        </IconButton>
                        {men.username != auth.state.username &&
                            <IconButton edge="end" onClick={() => handleCopyMention(men)}>
                                <Icon>content_copy</Icon>
                            </IconButton>
                        }
                        {men.username == auth.state.username &&
                            <IconButton edge="end" >
                                <Icon></Icon>
                            </IconButton>
                        }
                    </ListItem>
                )}
            </List>
        </div>
    );
};

export default withStyles(styles)(AnnotationPanel);