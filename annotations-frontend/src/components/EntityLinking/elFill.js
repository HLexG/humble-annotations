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

    const punctuation = ['.', ',', '"', "'", '?','!', '%',"’",'”','“']

    const colorList = ["#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54"];

    // Setup Component
    useEffect(() => {
        loadSupportTextTree();
    }, [props.supportiveText]);


    



    const renderSupportTextItems = (items) => {
        return (
            <>
                {items.map(i => {
					
					// new if statement enclosure
					//checking mention_check first
					if (i.mention_check=="yes"){
                        return (
                            <b>{punctuation.includes(i.token_text) ? "": " "}{i.token_text}</b>
                        )
                    }else if (punctuation.includes(i.token_text)){
                        return (
                            `${i.token_text}`
                        )
                    }else{
                        return (
                            ` ${i.token_text}`
                        )
                            }
                        }

                        )
					}
            </>
        )
    }

    return (
        <span style={{padding: "1em"}}>
            {supportTextTree && supportTextTree.nodes && (
                renderSupportTextItems(supportTextTree.nodes)
            )}
        </span>
    );
};

export default SupportText;