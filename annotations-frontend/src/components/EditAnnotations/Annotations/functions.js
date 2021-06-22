export const colorList = ["#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54", "#C0504D", "#1F497D", "#9BBB59", "#F79646", "#4BACC6", "#8064A2", "#948A54"];

export const buildAnnotationTree = (document, mentions) => {
    console.log("Building Annotation Tree...");
    // Top level
    let tree = {
        "type": "document",
        "nodes": []
    };
    let currentNode = [tree]
    // Tokens
    document.tokens.forEach((token, t_idx) => {
        // Check if the token has Mentions
        if (mentions) {
            let mention_starts = mentions.filter(m => m.sentence_id === token.sentence_id && m.start_token_id === token.token_id);
            mention_starts.sort((a, b) => a.end_token_id - b.end_token_id);
            // //console.log("mention_starts:",mention_starts);
            mention_starts.forEach((m, m_idx) => {
                let mention = {
                    "id": t_idx,
                    "type": "mention",
                    "backgroundColor": colorList[t_idx],
                    "obj": { ...m, "text": "" },
                    "nodes": []
                }
                currentNode[currentNode.length - 1]["nodes"].push(mention);
                currentNode.push(mention);
            });
        }

        //console.log(currentNode);
        currentNode[currentNode.length - 1]["nodes"].push({
            "id": t_idx,
            "type": "token",
            "obj": token,
            "nodes": []
        });

        if (mentions) {
            let mention_ends = mentions.filter(m => m.sentence_id === token.sentence_id && m.end_token_id === token.token_id);
            mention_ends.sort((a, b) => a.start_t_id - b.start_token_id);
            // //console.log("mention_ends:",mention_ends);
            mention_ends.forEach((m, m_idx) => {
                currentNode.pop();
            });
        }
    });

    return tree;
}