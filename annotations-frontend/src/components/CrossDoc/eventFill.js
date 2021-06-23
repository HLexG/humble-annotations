import React, {useEffect, useRef, useState} from 'react';

import {buildSupportTextTree} from './functions';

const SupportText = (props) => {
    const { classes } = props;
    const { supportiveText } = props;

    // Component States
    const [supportTextTree, setSupportTextTree] = useState(null);
    const loadSupportTextTree = () => {
        let tree = buildSupportTextTree(supportiveText);
        console.log(tree);
        setSupportTextTree(tree);
    }

    const [refresh, setRefresh] = useState(0);

    const colorList = ["#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54"];

    // Setup Component
    useEffect(() => {
        loadSupportTextTree();
    }, [props.supportiveText]);






    const renderSupportTextItems = (items) => {
        return (
            <div style={{maxWidth: "200px"}}>
                {items.map(i => {

                    if (i.type == "token") {
                        //let className = classes.token;


                        // Styles for special character tokens
                        //if ([',', '.', ';'].includes(i.token_text)) {
                        ///    style["whiteSpace"] = "normal";
                        //    style["marginLeft"] = "-2px";
                        //}
                        return (
                            <a
                                key={i.id}
                                
                                style={i.mention_check=="yes" ? {padding: ".5em", fontWeight: "900"} : {padding: ".5em"}}
                                
                                background-color={i.backgroundColor}
                            >
                                {i.token_text}
                            </a>
                        )
                    } else {
                        return (
                            
                            <div
                                key={i.id}
                                
                                background-color={i.backgroundColor}
                            >
                                <mark style={{ backgroundColor: colorList[i.obj.cluster_id] }} ><a>{i.token_text}</a></mark>
                                {i.nodes && renderSupportTextItems(i.nodes)}
                            </div>
                            
                        )
                    }

                })}
            </div>
        )
    }

    return (
        <div className={classes.content}>
        <span style={{padding: "1em"}}>
            {supportTextTree && supportTextTree.nodes && (
                renderSupportTextItems(supportTextTree.nodes)
            )}
        </span>
        </div>
    );
};

export default SupportText;