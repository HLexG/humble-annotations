def process_clusters(doc, spans):
    """
    Function to transform mentions given by SpaCy into our database format
    :param doc: Document processed by SpaCy
    :param spans: Filtered spans matched through pattern
    :return: Dictionary of mentions
    """
    print(111)
    eVmentions = []
    # Process Spacy candiate event mentions into dictionaries with our database format
    for mention_id, mention in enumerate(spans):
        for n_sent, sent in enumerate(doc.sents):
            if mention.sent.start == sent.start:
                curr_sent = n_sent
                continue

        eVmentions.append({
            "cluster_id": mention_id,
            "start_token_id": mention.start,
            "end_token_id": mention.end - 1,
            "sentence_id": curr_sent,
        })
    # Return dictionary
    annotations = {
        "mentions": eVmentions
    }

    return annotations