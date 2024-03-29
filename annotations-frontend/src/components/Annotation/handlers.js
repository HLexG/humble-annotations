const findNextId = (list) => {
    return Math.max(...list.map(o => o.id), 0)+1;
}


/*export const setBg = () => {
  return "#"+ Math.floor(Math.random()*16777215).toString(16);
}*/

    /*mention["backgroundColor"] = "red";
            //this.state.mention.filter(i => i.id !== mention.id);
        //this.setState({mention});
    console.log(state["setSelectedMention"])
    annotations["mentions"] = annotations["mentions"].filter(item => item.id != setSelectedMention.id);*/


export const handleMentionClick = (event, mention, state) => {
    event.stopPropagation();
    // Select the mention
    state["setSelectedMention"](mention);
};

export const handleKeyDown = (event, state) => {
    console.log('Key pressed', event.keyCode,state);
    if(event.keyCode === 27){
        // Esc
        state["setSelectedToken"](null);
} else if (event.keyCode === 8){
        // Delete
        let annotations = state['annotations'];
        annotations.splice(1, 1,);
    }
  };

export const handleTokenClick = (event, token, isDouble, state) => {

    window.getSelection().removeAllRanges();
    // event.stopPropagation();
    console.log("handleTokenClick: double=",isDouble,token);

    let annotations = state["annotations"];
    const addMention = () => {
        let sourceToken = state["selectedToken"];
const colorList = ["#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#000000","#948A54"]
        console.log(sourceToken)
         var strPhr = '';
         var i;
        for (var i = sourceToken["token_id"]; i < token["token_id"]; i++) {
            var strPhr =+ " " + [i];
            console.log(strPhr)

        }

        if(sourceToken["sentence_id"] === token["sentence_id"]){
            let mention = {
                "id": findNextId(annotations["mentions"]),
                "backgroundColor": colorList[findNextId(annotations["mentions"])],
                "sentence_id":token["sentence_id"],
                "document_id":token["document_id"],
                "text":token["text"],
                "strPhr": strPhr,
                "start_token_id":sourceToken["token_id"],
                "end_token_id":token["token_id"],
                "pos":token["pos"],
                "cluster_id":-1 //FIX
            }
            let cluster = {
                "id":findNextId(annotations["clusters"]),
                "backgroundColor": colorList[findNextId(annotations["clusters"])],
                "name": "M"
            }
            mention["cluster_id"] = cluster["id"];
            cluster["name"] = "M"+cluster["id"];

            annotations["mentions"].push(mention);
            annotations["clusters"].push(cluster);
            
            // Update state
            //state["setAnnotations"](annotations);
            state["setRefresh"](state["refresh"]+1);
            //console.log(state["annotations"]);
        }
    }

    if(state["selectedToken"] === null){
        // Select the first word in span
        state["setSelectedToken"](token);
    }else {
        // Add mention
        addMention();
        // Reset selection
        state["setSelectedToken"](null);
    }

};


export const handleMentionDragStart = (event, mention, state) => {
    console.log("handleMentionDragStart...",mention);
    event.stopPropagation();
    // Select the source mention
    state["setDraggedMention"](mention);
};
export const handleMentionDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
};
export const handleMentionDrop = (event, mention, state) => {
    console.log("handleMentionDrop...",mention);
    event.stopPropagation();
    event.preventDefault();

    let annotations = state["annotations"];

    // Check the drag and drop mentions are different
    if(state["draggedMention"] !== null && state["draggedMention"]["id"] !== mention["id"]){
        // Create a link by assigning the destination mention to the cluster of the source mention

        // Destination mention
        let dest_mention = annotations["mentions"].find(m => m.id === mention.id);
        dest_mention["cluster_id"] = state["draggedMention"]["cluster_id"];
        dest_mention["background_color"] = state["draggedMention"]["background_color"]

        // Update state
        //state["setAnnotations"](annotations);
        state["setDraggedMention"](null);
        state["setRefresh"](state["refresh"]+1);
        console.log(state["annotations"]);
    }
};