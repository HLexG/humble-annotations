# Spacy patterns

# Noun phrase pattern from recipes/coref.py in Prodigy
pattern_np = [
            {"POS": "DET", "TAG": {"NOT_IN": ["PRP$"]}, "OP": "?"},
            {"POS": "ADJ", "OP": "*"},
            # Proper nouns but no entities, otherwise this custom pattern
            # would overwrite them
            {
                "POS": {"IN": ["PROPN", "NOUN"]},
                "OP": "+",
                "ENT_TYPE": {"NOT_IN": ["PERSON", "ORG"]},
            },
        ]

# Pronouns
pattern_prn = [{'POS':'PRON'}]


