-- migrate:up
ALTER TABLE documents 
ADD COLUMN word_count bigint;

UPDATE documents
SET word_count = array_length(regexp_split_to_array(document_text, E'\\s+'), 1)

-- migrate:down

