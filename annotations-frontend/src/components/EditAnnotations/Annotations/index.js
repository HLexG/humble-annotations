import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import _ from "lodash";

import styles from './styles';
import { buildAnnotationTree, colorList } from './functions';

const Annotations = (props) => {
    const { classes } = props;
    const { document } = props;
    const { task } = props;
    const { mentions } = props;
    const { editMentions } = props;
    const { editCorefs } = props;
    const { setMentions } = props;

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
        // Keydown event listener
        window.addEventListener('keydown', (event) => handleKeyDown(event));

        // Cleanup Component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
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
        }
        return style;
    }
    const findNextId = (list) => {
        return Math.max(...list.map(o => o.id), 0) + 1;
    }
    const deleteMention = (mention) => {
        let new_mentions = [...mentions];
        _.remove(new_mentions, function (n) { return n.id === mention.id; });
        setMentions(new_mentions);
    }

    // Handlers
    function isIterable(input) {  
        if (input === null || input === undefined) {
          return false
        }
      
        return typeof input[Symbol.iterator] === 'function'
      }

    const handleTokenClick = (event, token, isDouble) => {
        //if (!editMentions) {
        //    return;
        //}

        window.getSelection().removeAllRanges();
        // event.stopPropagation();
        console.log("handleTokenClick: double=", isDouble, token);
        setSelectedMention(null);

        const addMention = () => {
            let sourceToken = selectedToken;

            if (sourceToken["sentence_id"] === token["sentence_id"]) {
                let mention = {
                    sentence_id: token["sentence_id"],
                    start_token_id: sourceToken["token_id"],
                    end_token_id: token["token_id"],
                    mention_text: token["mention_text"]
                }
                
                if (isIterable(mentions)) {
                    var new_mentions = [...mentions];
                } else {
                    var new_mentions = [];
                }
                new_mentions.push(mention);
                setMentions(new_mentions);
            }
        }

        if (selectedToken === null) {
            // Select the first word in span
            setSelectedToken(token);
        } else {
            // Add mention
            addMention();
            // Reset selection
            setSelectedToken(null);
        }

    }
    const handleMentionClick = (event, mention) => {
        event.stopPropagation();
        
        //if (!editMentions) {
        //    return;
        //}
        console.log("handleMentionClick:", mention);

        // Select the mention
        setSelectedMention(mention);
    };

    const handleKeyDown = (event) => {
        console.log('Key pressed', event.keyCode);
        if (event.keyCode === 27) {
            // Esc
            setSelectedToken(null);
            setSelectedMention(null);
        } else if (event.keyCode === 8) {
            // Delete
            //annotations.splice(1, 1,);
            console.log(selectedMention);
            if (selectedMention) {
                console.log("Deleting...", selectedMention)
                deleteMention(selectedMention);
            }
        }
    };
    const handleMentionDragStart = (event, mention) => {
        console.log("handleMentionDragStart...", mention);
        event.stopPropagation();
        // Select the source mention
        setDraggedMention(mention);
    };
    const handleMentionDragOver = (event) => {
        console.log("handleMentionDragOver...");
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