export const buildAnnotationTree = (tokens, annotations) => {
    const colorList = ["#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#000000","#948A54"]


    if(tokens && tokens.length > 0){
        // Create Cluster index look up
        let clusters = {};
        annotations["clusters"].forEach((cluster, c_idx) => {
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
            let mention_starts = annotations["mentions"].filter(m => m.sentence_id === token.sentence_id && m.start_token_id === token.token_id);
            mention_starts.sort((a, b) => a.end_token_id - b.end_token_id);
            //console.log("mention_starts:",mention_starts);
            mention_starts.forEach((m, m_idx) => {
                let mention = {
                    "id": t_idx,
                    "type":"mention",
                    "backgroundColor": colorList[t_idx],
                    "obj":{...m,"text":clusters[m["cluster_id"]]["name"]},
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

            let mention_ends = annotations["mentions"].filter(m => m.sentence_id === token.sentence_id && m.end_token_id === token.token_id);
            mention_ends.sort((a, b) => a.start_t_id - b.start_token_id);
            //console.log("mention_ends:",mention_ends);
            mention_ends.forEach((m, m_idx) => {
                currentNode.pop();
            });
        });

        return tree;
    }else{
        return null;
    }
}

export const HSLToRGB = (h,s,l) => {
    // Must be fractions of 1
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
    
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;  
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r,g,b];
}

export const buildColorPalette = (hueStep, saturationStep, lightnessStep) => {
    if (!hueStep) hueStep = 25;
    if (!saturationStep) saturationStep = 25;
    if (!lightnessStep) lightnessStep = 10;

    var color_palette = [];
    for (var s=100; s>0; s-=saturationStep) {
        for (var l=80; l>10; l-=lightnessStep) {
            for (var h=0; h<360; h+=hueStep) {
                let color = {
                    "hsl": [h, s, l],
                    "rgb": HSLToRGB(h, s, l)
                }
                color_palette.push(color);
            }
        }
    }

    return color_palette;
}



export const returnColor = (mentionCount) =>{
    const colorList = ["#C0504D","#1F497D", "#9BBB59","#F79646","#4BACC6","#8064A2","#000000","#948A54"]
    var outputColor = colorList[mentionCount];

    return outputColor;
}