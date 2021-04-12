import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import {buildAnnotationTree} from './functions';
import {handleKeyDown, handleTokenClick,handleMentionClick,
    handleMentionDragStart, handleMentionDragOver, handleMentionDrop} from './handlers';

const Annotation = ( props ) => {
    const {classes} = props;
    const { history } = props;
    let { tokens } = props;
    let { annotations } = props;

    console.log("================================== Annotation ======================================");

    // Component States
    // const [tokens , setTokens] = useState([]);
    // const [annotations , setAnnotations] = useState(null);
    const [annotationTree, setAnnotationTree] = useState(null);
    const loadAnnotationTree = () => {
        if(tokens && annotations){
            setAnnotationTree(buildAnnotationTree(tokens,annotations));
        }else{
            setAnnotationTree(null);
        }
    }
    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedMention, setSelectedMention] = useState(null);
    const [draggedMention, setDraggedMention] = useState(null);
    const [refresh , setRefresh] = useState(0);

    // State holder for reference in handlers
    let state = {
        "tokens": tokens,
        // "setTokens": setTokens,
        "annotations": annotations,
        // "setAnnotations": setAnnotations,
        "selectedToken":selectedToken,
        "setSelectedToken":setSelectedToken,
        "selectedMention":selectedMention,
        "setSelectedMention":setSelectedMention,
        "draggedMention":draggedMention,
        "setDraggedMention":setDraggedMention,
        "refresh":refresh,
        "setRefresh":setRefresh
    }

    // Setup Component
    useEffect(() => {
        // Set state from props
        // setTokens(props.tokens);
        // setAnnotations(props.annotations);

        // Keydown event listener
        window.addEventListener('keydown', (event) => handleKeyDown(event,state));

        // Cleanup Component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    useEffect(() => {
        // Build annotation tree
        loadAnnotationTree()
      }, [refresh, props.annotations]);

    // Component functions
    const isTokenSelected = (token) => {
        var style = {};
        var selectedStyle = {
            textDecoration: "underline"
        }

        if(selectedToken && (selectedToken.token_id === token.token_id) && (selectedToken.sentence_id === token.sentence_id)){
            style = selectedStyle
        }
        return style;
    }
    const renderAnnotationItems = (items) => {
        return (
            <>
                { items.map(i => {
                    if(i.type == "token"){
                        let className = classes.token;
                        let style = isTokenSelected(i.obj);
                        let onClick = (event)=>handleTokenClick(event,i.obj,false,state);

                        // Styles for special character tokens
                        if([',','.',';'].includes(i.obj.text)){
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
                                {i.obj.text}
                            </a> 
                        )
                    }else{
                        return (
                            <span 
                                key={i.id} 
                                className={classes.mention}
                                draggable={true}
                                onClick={(event)=>handleMentionClick(event,i.obj,state)} 
                                onDragStart={(event)=>handleMentionDragStart(event,i.obj,state)}
                                onDragOver={(event)=>handleMentionDragOver(event)}
                                onDrop={(event)=>handleMentionDrop(event,i.obj,state)}
                                background-color={i.backgroundColor}
                            >
                                <mark background-color={i.backgroundColor} className={classes.mentionhead}><a className={classes.mentionheadtext}>{ i.obj.text }</a></mark>
                                { i.nodes && renderAnnotationItems(i.nodes) }
                            </span>
                        )
                    }
                    
                })}
            </>
        )
        }

    return (
        <div className={classes.content}>
            {annotationTree && (
                renderAnnotationItems(annotationTree.nodes)
            )}
        </div>
    );
};

export default withStyles( styles )( Annotation );