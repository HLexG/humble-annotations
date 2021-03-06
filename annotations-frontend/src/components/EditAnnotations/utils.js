export const buildAnnotationTree = (tokens, annotations) => {
    if(tokens && tokens.length > 0){
        // Create Cluster index look up
        let clusters = {};
        annotations["clusters"].forEach((cluster) => {
            clusters[cluster["id"]] = cluster;
        });
        console.log(clusters);

        // Top level
        let tree = {
            "type": "document",
            "nodes": []
        };
        let currentNode = [tree]
        // Tokens
        tokens.forEach((token,t_idx) => {
            // Check if the token has Mentions
            let mention_starts = annotations["mentions"].filter(m => m.s_id === token.s_id && m.start_t_id === token.t_id);
            mention_starts.sort((a, b) => a.end_t_id - b.end_t_id);
            //console.log(mentions);
            mention_starts.forEach((m, m_idx) => {
                let mention = {
                    "id": t_idx,
                    "type":"mention",
                    "obj":{...m,"text":clusters[m["c_id"]]["name"]},
                    "nodes": []
                }
                currentNode[currentNode.length - 1]["nodes"].push(mention);
                currentNode.push(mention);
            });
            
            //console.log(currentNode);
            currentNode[currentNode.length - 1]["nodes"].push({
                "id": t_idx,
                "type":"token",
                "obj":token,
                "nodes": []
            });

            let mention_ends = annotations["mentions"].filter(m => m.s_id === token.s_id && m.end_t_id === token.t_id);
            mention_ends.sort((a, b) => a.start_t_id - b.start_t_id);
            mention_ends.forEach((m, m_idx) => {
                currentNode.pop();
            });
        })

        return tree;
    }else{
        return null;
    }
}