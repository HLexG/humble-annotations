-- migrate:up
UPDATE documents
SET word_count bigint DEFAULT (array_length(regexp_split_to_array(document_text, E'\\s+'), 1))

-- migrate:down

