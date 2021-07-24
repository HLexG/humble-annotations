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
    const { task } = props;
    const { annotations } = props;
    const { selectedAnnotation } = props;
    const { handleSetAnnotation } = props;
    const { handleCopyMentionAnnotation } = props;

    const auth = useAuthContext();

    // Component States


    // Setup Component
    useEffect(() => {

    }, []);

    // Function
    const isAnnotationSelected = (annotation, annotation_type) => {
        let style = {};
        if (annotation_type == task && selectedAnnotation && (annotation.id == selectedAnnotation.id)) {
            style = { backgroundColor: "#dcdcdc" };
        }

        return style
    }

    // Handlers
    const handleViewAnnotation = (annotation) => {
        handleSetAnnotation(annotation);
    }
    const handleCopyMention = (annotation) => {
        handleCopyMentionAnnotation(annotation);
    }
    const handleViewCoref = (annotation) => {
        //handleSetMentionAnnotation(annotation);
    }
    const handleCopyCoref = (annotation) => {
        //handleCopyMentionAnnotation(annotation);
    }

    return (
        <div className={classes.toolspanel}>
            <Typography className={classes.toolstitle}>
                Mentions
            </Typography>
            <List className={classes.annotationReferences}>
                {annotations && annotations.length > 0 && annotations.map((annotation, index) =>
                    <ListItem
                        key={index}
                        className={classes.annotationReferenceItems}
                        style={isAnnotationSelected(annotation, "entity_mention")}
                    >
                        <Typography>
                            {annotation.username}
                        </Typography>
                        <div className={classes.grow}></div>
                        <IconButton edge="end" onClick={() => handleViewAnnotation(annotation)}>
                            <Icon>visibility</Icon>
                        </IconButton>
                        {annotation.username != auth.state.username && task == "entity_mention" &&
                            <IconButton edge="end" onClick={() => handleCopyMention(annotation)}>
                                <Icon>content_copy</Icon>
                            </IconButton>
                        }
                        {annotation.username == auth.state.username && task == "entity_mention" &&
                            <IconButton edge="end" >
                                <Icon></Icon>
                            </IconButton>
                        }
                    </ListItem>
                )}
            </List>
            {task == "entity_coreference" &&
                <div>
                    <Typography className={classes.toolstitle}>
                        Coreferences
                    </Typography>
                    <List className={classes.annotationReferences}>
                        {annotations && annotations.length > 0 && annotations.map((annotation, index) =>
                            <div key={index}>
                                {annotation.entity_coreference > 0 &&
                                    <ListItem
                                        className={classes.annotationReferenceItems}
                                        style={isAnnotationSelected(annotation, "entity_coreference")}
                                    >
                                        <Typography>
                                            {annotation.username}
                                        </Typography>
                                        <div className={classes.grow}></div>
                                        <IconButton edge="end" onClick={() => handleViewAnnotation(annotation)}>
                                            <Icon>visibility</Icon>
                                        </IconButton>
                                        {annotation.username != auth.state.username &&
                                            <IconButton edge="end" onClick={() => handleCopyCoref(annotation)}>
                                                <Icon>content_copy</Icon>
                                            </IconButton>
                                        }
                                        {annotation.username == auth.state.username &&
                                            <IconButton edge="end" >
                                                <Icon></Icon>
                                            </IconButton>
                                        }
                                    </ListItem>
                                }
                            </div>
                        )}
                    </List>
                </div>
            }
        </div>
    );
};

export default withStyles(styles)(AnnotationPanel);