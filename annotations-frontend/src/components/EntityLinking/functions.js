export const buildSupportTextTree = (supportiveText) => {

    // Top level
    let tree = {
        "type": "supportiveText",
        "nodes": []
    };
    let currentNode = [tree]
    // Tokens
    supportiveText.forEach((token) => {
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
    });

    return tree;
}