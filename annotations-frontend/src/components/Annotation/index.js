import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import {buildAnnotationTree} from './functions';
import {handleKeyDown, handleTokenClick,handleMentionClick,
    handleMentionDragStart, handleMentionDragOver, handleMentionDrop} from './handlers';

const Annotation = ( props ) => {
    const {classes} = props;
    const { history } = props;
    //let { tokens } = props;
    // let { annotations } = props;

    console.log("================================== Annotation ======================================");
    let id = Number(props.match.params.id);
    console.log("doc id")

<<<<<<< Updated upstream
    // Component States
    // const [tokens , setTokens] = useState([]);
    // const [annotations, setAnnotations] = useState([]);
=======
    console.log(id);
    console.log("type");
    console.log(typeof id);


    // /console.log(props);


    // Component States
    const [tokens , setTokens] = useState([]);
    const [document , setDocument] = useState([]);
    const [annotations, setAnnotations] = useState([]);
>>>>>>> Stashed changes
    const [annotationTree, setAnnotationTree] = useState(null);

    const loadDocument = (id) => {
        console.log("start loadDocument")
        DataService.GetDocument(id)
            .then(function (response) {
                setDocument(response.data);
                //console.log(`Token data: ${JSON.stringify(response['data']['tokens'])}`)
                console.log(`Gen. data: ${JSON.stringify(response['data'])}`)

               setTokens(response['data']['tokens'])
            });
        DataService.GetMentions(id)
            .then(function (response) {
                
                console.log(`Mention data: ${JSON.stringify(response['data'])}`)

               setAnnotations(response['data'])
            })
    }

    const loadAnnotationTree = () => {
        console.log("start load anno tree");
        if(tokens && annotations){
            console.log("load anno tree - > if -> yes");
            console.log(tokens);
            setAnnotationTree(buildAnnotationTree(tokens,annotations));
        }else{
            console.log("load anno tree - > if -> no");
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
        "setTokens": setTokens,
        "annotations": annotations,
        //"setAnnotations": setAnnotations,
        "selectedToken":selectedToken,
        "setSelectedToken":setSelectedToken,
        "selectedMention":selectedMention,
        "setSelectedMention":setSelectedMention,
        "draggedMention":draggedMention,
        "setDraggedMention":setDraggedMention,
        "refresh":refresh,
        "setRefresh":setRefresh
    }
    const colorList = ["#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#948A54","#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#948A54","#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#948A54","#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#948A54","#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#948A54"]

    // Setup Component
    useEffect(() => {
        // Set state from props
        // setTokens(props.tokens);
         // setAnnotations(props.annotations);

        // Keydown event listener
        window.addEventListener('keydown', (event) => handleKeyDown(event, state));

        // Cleanup Component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    useEffect(() => {
        // Build annotation tree
<<<<<<< Updated upstream
=======
        //loadDocument()
>>>>>>> Stashed changes
        loadAnnotationTree()
        /*const dynColor = colorList[this.props.annotations.cluster_id]*/
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
    
    const isMentionSelected = (mention) => {
        var style = {};
        var selectedStyle = {
            color: "red"
        }

        if(selectedMention && (selectedMention.id === mention.id) && (selectedMention.sentence_id === mention.sentence_id)){
            style = selectedStyle;
            console.log(mention.id);
            console.log(mention.sentence_id);
            
        }
        return style;
    }


<<<<<<< Updated upstream
=======



>>>>>>> Stashed changes

    const renderAnnotationItems = (items) => {
        console.log("render anno tree start")
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
<<<<<<< Updated upstream
                                {i.obj.text}
=======
                                {i.text}
>>>>>>> Stashed changes
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
                                style = {isMentionSelected(i.obj)}
                                background-color={i.backgroundColor}
                            >
                                {/*<mark style={{backgroundColor : colorList[i.obj.cluster_id]}} className={classes.mentionhead}><a className={classes.mentionheadtext}>{ i.obj.text }</a></mark>*/}
                                <mark className={classes.mentionhead}><a className={classes.mentionheadtext}>{ i.text }</a></mark>
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
<<<<<<< Updated upstream
=======
            <Button onClick = {()=> loadDocument(id)}>Load Doc</Button>
            <Button onClick = {()=> loadAnnotationTree()}>Load Tree</Button>
            <Button onClick = {console.log("check btn")}>Check</Button>
>>>>>>> Stashed changes
            {annotationTree && (
                renderAnnotationItems(annotationTree.nodes)
            )}
        </div>
    );
};

export default withStyles( styles )( Annotation );