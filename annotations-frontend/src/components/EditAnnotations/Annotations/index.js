import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import { buildAnnotationTree, colorList } from './functions';

const Annotations = (props) => {
    const { classes } = props;
    const { document } = props;
    const { mentions } = props;
    const { editMentions } = props;
    const { editCorefs } = props;

    // Component States
    const [annotationTree, setAnnotationTree] = useState(null);
    const loadAnnotationTree = () => {
        let tree = buildAnnotationTree(document, mentions);
        console.log(tree);
        setAnnotationTree(tree);
    }
    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedMention, setSelectedMention] = useState(null);
    const [draggedMention, setDraggedMention] = useState(null);
    const [refresh, setRefresh] = useState(0);

    // Setup Component
    useEffect(() => {
        loadAnnotationTree();
    }, [props.document, props.mentions]);

    // Component functions
    const isTokenSelected = (token) => {
        var style = {};
        var selectedStyle = {
            textDecoration: "underline"
        }

        if (selectedToken && (selectedToken.token_id === token.token_id) && (selectedToken.sentence_id === token.sentence_id)) {
            style = selectedStyle
        }
        return style;
    }

    const isMentionSelected = (mention) => {
        var style = {};
        var selectedStyle = {
            color: "red"
        }

        if (selectedMention && (selectedMention.id === mention.id) && (selectedMention.sentence_id === mention.sentence_id)) {
            style = selectedStyle;
            console.log(mention.id);
            console.log(mention.sentence_id);

        }
        return style;
    }

    // Handlers
    const handleTokenClick = (event, token, isDouble) => {
        if (!editMentions) {
            return;
        }

    }
    const handleMentionClick = (event, mention) => {
        event.stopPropagation();
        if (!editMentions) {
            return;
        }
        // Select the mention
        setSelectedMention(mention);
    };

    const handleKeyDown = (event) => {
        console.log('Key pressed', event.keyCode);
        if (event.keyCode === 27) {
            // Esc
            setSelectedToken(null);
        } else if (event.keyCode === 8) {
            // Delete
            //annotations.splice(1, 1,);
        }
    };
    const handleMentionDragStart = (event, mention) => {
        console.log("handleMentionDragStart...", mention);
        event.stopPropagation();
        // Select the source mention
        setDraggedMention(mention);
    };
    const handleMentionDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };
    const handleMentionDrop = (event, mention) => {
        console.log("handleMentionDrop...", mention);
        event.stopPropagation();
        event.preventDefault();
    }

    const renderAnnotationItems = (items) => {
        return (
            <>
                {items.map(i => {

                    if (i.type == "token") {
                        let className = classes.token;
                        let style = isTokenSelected(i.obj);
                        let onClick = (event) => handleTokenClick(event, i.obj, false);

                        // Styles for special character tokens
                        if ([',', '.', ';'].includes(i.obj.token_text)) {
                            style["whiteSpace"] = "normal";
                            style["marginLeft"] = "-2px";
                        }
                        return (
                            <a
                                key={i.id}
                                className={className}
                                onClick={onClick}
                                style={style}
                                background-color={i.backgroundColor}
                            >
                                {i.obj.token_text}
                            </a>
                        )
                    } else {
                        return (
                            <span
                                key={i.id}
                                className={classes.mention}
                                draggable={editCorefs}
                                onClick={(event) => handleMentionClick(event, i.obj)}
                                onDragStart={(event) => handleMentionDragStart(event, i.obj)}
                                onDragOver={(event) => handleMentionDragOver(event)}
                                onDrop={(event) => handleMentionDrop(event, i.obj)}
                                style={isMentionSelected(i.obj)}
                                background-color={i.backgroundColor}
                            >
                                <mark style={{ backgroundColor: colorList[i.obj.cluster_id] }} className={classes.mentionhead}><a className={classes.mentionheadtext}>{i.obj.text}</a></mark>
                                {i.nodes && renderAnnotationItems(i.nodes)}
                            </span>
                        )
                    }

                })}
            </>
        )
    }

    return (
        <div className={classes.content}>
            {annotationTree && annotationTree.nodes && (
                renderAnnotationItems(annotationTree.nodes)
            )}
        </div>
    );
};

export default withStyles(styles)(Annotations);