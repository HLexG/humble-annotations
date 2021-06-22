export const buildSupportTextTree = (supportiveText) => {

    // Top level
    let tree = {
        "type": "supportiveText",
        "nodes": []
    };
    let currentNode = [tree]
    // Tokens
    supportiveText.forEach((token) => {
        // // Check if the token has Mentions
        // let mention_starts = annotations["mentions"].filter(m => m.sentence_id === token.sentence_id && m.start_token_id === token.token_id);
        // mention_starts.sort((a, b) => a.end_token_id - b.end_token_id);
        // //console.log("mention_starts:",mention_starts);
        // mention_starts.forEach((m, m_idx) => {
        //     let mention = {
        //         "id": t_idx,
        //         "type": "mention",
        //         "backgroundColor": colorList[t_idx],
        //         "obj": { ...m, "text": clusters[m["cluster_id"]]["name"] },
        //         "nodes": []
        //     }
        //     currentNode[currentNode.length - 1]["nodes"].push(mention);
        //     currentNode.push(mention);
        // });

        //console.log(currentNode);
        currentNode[currentNode.length - 1]["nodes"].push({
            "id": token.token_id,
            "type": "token",
            "document_id":token.document_id,
            "sentence_id": token.sentence_id,
            "obj": token,
            "token_text":token.token_text,
            "mention_check": token.mention_check,
            "nodes": []
        });

        // let mention_ends = annotations["mentions"].filter(m => m.sentence_id === token.sentence_id && m.end_token_id === token.token_id);
        // mention_ends.sort((a, b) => a.start_t_id - b.start_token_id);
        // //console.log("mention_ends:",mention_ends);
        // mention_ends.forEach((m, m_idx) => {
        //     currentNode.pop();
        // });
    });

    return tree;
}