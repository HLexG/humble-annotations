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

spacy_entities = {'PERSON': 'People, including fictional',
                  'NORP': 'Nationalities or religious or political groups',
                  'FAC': 'Buildings, airports, highways, bridges, etc',
                  'ORG': 'Companies, agencies, institutions, etc',
                  'GPE': 'Countries, cities, states',
                  'LOC': 'Non-GPE locations, mountain ranges, bodies of water',
                  'PRODUCT': 'Objects, vehicles, foods, etc. (Not services)',
                  'EVENT': 'Named hurricanes, battles, wars, sports events, etc',
                  'WORK_OF_ART': 'Titles of books, songs, etc',
                  'LAW': 'Named documents made into laws',
                  'LANGUAGE': 'Any named language',
                  'DATE': 'Absolute or relative dates or periods',
                  'TIME': 'Times smaller than a day',
                  'PERCENT': 'Percentage, including %',
                  'MONEY': 'Monetary values, including unit',
                  'QUANTITY': 'Measurements, as of weight or distance',
                  'ORDINAL': 'first, second, etc',
                  'CARDINAL': 'Numerals that do not fall under another type',}
