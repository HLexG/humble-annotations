import os
import requests
import zipfile
import tarfile

from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize


def process_clusters(doc, clusters):
    """
    Function to transform clusters given by SpanBERT into our database format
    :param doc: Document in text format
    :param clusters: output['clusters] from SpanBERT
    :return: Dictionary of mentions
    """

    # Tokenize words and sentences with NLTK
    sentences = sent_tokenize(doc)

    # Create dictionary to map from SpanBERT model tokens to NLTK tokens
    tokenmap = {}
    token_idx = 0
    for s_idx,s in enumerate(sentences):
      words = word_tokenize(s)
      for w_idx,w in enumerate(words):
        tokenmap[token_idx] = {"token_id":w_idx,"sentence_id":s_idx}
        token_idx += 1

    mentions = []
    # Process SpanBERT clusters into dictionaries with our database format
    for c_idx,cluster in enumerate(clusters):
      # Mentions
      for mention in cluster:
        mentions.append({
            "cluster_id": c_idx,
            "start_token_id": tokenmap[mention[0][0]]["token_id"],
            "end_token_id": tokenmap[mention[0][1]-1]["token_id"],
            "sentence_id": tokenmap[mention[0][0]]["sentence_id"]
        })

    # Return dictionary
    annotations = {
                  "mentions": mentions
    }

    return annotations


def download_file(packet_url, base_path="", extract=False, headers=None):
    if base_path != "":
        if not os.path.exists(base_path):
            os.mkdir(base_path)
    packet_file = os.path.basename(packet_url)
    with requests.get(packet_url, stream=True, headers=headers) as r:
        r.raise_for_status()
        with open(os.path.join(base_path, packet_file), 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)

    if extract:
        if packet_file.endswith('.zip'):
            with zipfile.ZipFile(os.path.join(base_path, packet_file)) as zfile:
                zfile.extractall(base_path)
        else:
            packet_name = packet_file.split('.')[0]
            with tarfile.open(os.path.join(base_path, packet_file)) as tfile:
                tfile.extractall(base_path)