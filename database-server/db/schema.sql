SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: acl_permission_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.acl_permission_type AS ENUM (
    'read',
    'readwrite',
    'owner'
);


--
-- Name: annotation_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.annotation_status AS ENUM (
    'save',
    'commit'
);


--
-- Name: annotation_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.annotation_type AS ENUM (
    'entity_mention',
    'entity_coreference',
    'named_entity_recognition',
    'entity_linking',
    'event_mention',
    'event_coreference'
);


--
-- Name: user_account_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_account_type AS ENUM (
    'user',
    'admin',
    'model'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: annotations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.annotations (
    id bigint NOT NULL,
    document_id bigint NOT NULL,
    user_id bigint,
    type public.annotation_type NOT NULL,
    status public.annotation_status DEFAULT 'save'::public.annotation_status NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: annotations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.annotations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: annotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.annotations_id_seq OWNED BY public.annotations.id;


--
-- Name: clusters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clusters (
    id bigint NOT NULL,
    annotation_id bigint NOT NULL,
    cluster_name text NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: clusters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clusters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clusters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clusters_id_seq OWNED BY public.clusters.id;


--
-- Name: coreferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coreferences (
    annotation_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    mention_id bigint NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: datasets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.datasets (
    id bigint NOT NULL,
    dataset_name text NOT NULL,
    dataset_description text,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: datasets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.datasets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: datasets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.datasets_id_seq OWNED BY public.datasets.id;


--
-- Name: datasets_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.datasets_users (
    id bigint NOT NULL,
    dataset_id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_type public.acl_permission_type NOT NULL,
    is_default boolean NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: datasets_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.datasets_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: datasets_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.datasets_users_id_seq OWNED BY public.datasets_users.id;


--
-- Name: documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents (
    id bigint NOT NULL,
    dataset_id bigint NOT NULL,
    document_name text NOT NULL,
    filepath text NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: entity_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entity_categories (
    id bigint NOT NULL,
    category_code text NOT NULL,
    category_name text,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: entity_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entity_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entity_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entity_categories_id_seq OWNED BY public.entity_categories.id;


--
-- Name: entity_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entity_links (
    annotation_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    wikidata_id bigint NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: mentions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentions (
    id bigint NOT NULL,
    annotation_id bigint NOT NULL,
    start_token_id integer NOT NULL,
    end_token_id integer NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: mentions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mentions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mentions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mentions_id_seq OWNED BY public.mentions.id;


--
-- Name: named_entities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.named_entities (
    annotation_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    entity_category_id bigint NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tokens (
    db_id bigint NOT NULL,
    id bigint NOT NULL,
    document_id bigint NOT NULL,
    "position" integer NOT NULL,
    sentence_id integer NOT NULL,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: tokens_db_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tokens_db_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tokens_db_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tokens_db_id_seq OWNED BY public.tokens.db_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    email text,
    full_name text,
    hashed_password text,
    account_type public.user_account_type DEFAULT 'user'::public.user_account_type NOT NULL,
    github_username text,
    twitter_handle text,
    research_interests text,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    updated_at bigint
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: wikidata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wikidata (
    db_id bigint NOT NULL,
    id text NOT NULL,
    alt_id text DEFAULT '-1'::text,
    dataset_id bigint NOT NULL,
    entity_name text NOT NULL,
    description text NOT NULL,
    url text,
    created_at bigint DEFAULT (date_part('epoch'::text, clock_timestamp()) * (1000)::double precision) NOT NULL,
    created_by bigint,
    updated_at bigint,
    updated_by bigint
);


--
-- Name: wikidata_db_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wikidata_db_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wikidata_db_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wikidata_db_id_seq OWNED BY public.wikidata.db_id;


--
-- Name: annotations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations ALTER COLUMN id SET DEFAULT nextval('public.annotations_id_seq'::regclass);


--
-- Name: clusters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters ALTER COLUMN id SET DEFAULT nextval('public.clusters_id_seq'::regclass);


--
-- Name: datasets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets ALTER COLUMN id SET DEFAULT nextval('public.datasets_id_seq'::regclass);


--
-- Name: datasets_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users ALTER COLUMN id SET DEFAULT nextval('public.datasets_users_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: entity_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_categories ALTER COLUMN id SET DEFAULT nextval('public.entity_categories_id_seq'::regclass);


--
-- Name: mentions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions ALTER COLUMN id SET DEFAULT nextval('public.mentions_id_seq'::regclass);


--
-- Name: tokens db_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens ALTER COLUMN db_id SET DEFAULT nextval('public.tokens_db_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT currval('public.tokens_db_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: wikidata db_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wikidata ALTER COLUMN db_id SET DEFAULT nextval('public.wikidata_db_id_seq'::regclass);


--
-- Name: annotations annotations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_pkey PRIMARY KEY (id);


--
-- Name: clusters clusters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_pkey PRIMARY KEY (id);


--
-- Name: datasets datasets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets
    ADD CONSTRAINT datasets_pkey PRIMARY KEY (id);


--
-- Name: datasets_users datasets_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users
    ADD CONSTRAINT datasets_users_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: entity_categories entity_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_categories
    ADD CONSTRAINT entity_categories_pkey PRIMARY KEY (id);


--
-- Name: mentions mentions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (db_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wikidata wikidata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wikidata
    ADD CONSTRAINT wikidata_pkey PRIMARY KEY (db_id);


--
-- Name: coreferences_annotation_cluster_mention; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX coreferences_annotation_cluster_mention ON public.coreferences USING btree (annotation_id, cluster_id, mention_id);


--
-- Name: datasets_users_project_and_user; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX datasets_users_project_and_user ON public.datasets_users USING btree (dataset_id, user_id);


--
-- Name: entity_links_annotation_cluster_wikidata; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX entity_links_annotation_cluster_wikidata ON public.entity_links USING btree (annotation_id, cluster_id, wikidata_id);


--
-- Name: named_entities_annotation_cluster_entity_category; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX named_entities_annotation_cluster_entity_category ON public.named_entities USING btree (annotation_id, cluster_id, entity_category_id);


--
-- Name: tokens_document_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tokens_document_id ON public.tokens USING btree (document_id);


--
-- Name: tokens_document_id_and_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tokens_document_id_and_id ON public.tokens USING btree (document_id, id);


--
-- Name: tokens_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tokens_id ON public.tokens USING btree (id);


--
-- Name: wikidata_alt_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wikidata_alt_id ON public.wikidata USING btree (alt_id);


--
-- Name: wikidata_entity_name_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wikidata_entity_name_id ON public.wikidata USING btree (entity_name);


--
-- Name: wikidata_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX wikidata_id ON public.wikidata USING btree (id);


--
-- Name: wikidata_id_alt_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX wikidata_id_alt_id ON public.wikidata USING btree (id, alt_id);


--
-- Name: annotations annotations_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: annotations annotations_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: annotations annotations_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: annotations annotations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: clusters clusters_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES public.annotations(id) ON DELETE CASCADE;


--
-- Name: clusters clusters_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: clusters clusters_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: coreferences coreferences_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coreferences
    ADD CONSTRAINT coreferences_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES public.annotations(id) ON DELETE CASCADE;


--
-- Name: coreferences coreferences_cluster_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coreferences
    ADD CONSTRAINT coreferences_cluster_id_fkey FOREIGN KEY (cluster_id) REFERENCES public.clusters(id) ON DELETE CASCADE;


--
-- Name: coreferences coreferences_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coreferences
    ADD CONSTRAINT coreferences_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: coreferences coreferences_mention_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coreferences
    ADD CONSTRAINT coreferences_mention_id_fkey FOREIGN KEY (mention_id) REFERENCES public.mentions(id) ON DELETE CASCADE;


--
-- Name: coreferences coreferences_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coreferences
    ADD CONSTRAINT coreferences_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: datasets datasets_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets
    ADD CONSTRAINT datasets_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: datasets datasets_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets
    ADD CONSTRAINT datasets_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: datasets_users datasets_users_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users
    ADD CONSTRAINT datasets_users_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: datasets_users datasets_users_dataset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users
    ADD CONSTRAINT datasets_users_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE;


--
-- Name: datasets_users datasets_users_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users
    ADD CONSTRAINT datasets_users_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: datasets_users datasets_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets_users
    ADD CONSTRAINT datasets_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: documents documents_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: documents documents_dataset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE;


--
-- Name: documents documents_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: entity_categories entity_categories_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_categories
    ADD CONSTRAINT entity_categories_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: entity_categories entity_categories_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_categories
    ADD CONSTRAINT entity_categories_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: entity_links entity_links_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_links
    ADD CONSTRAINT entity_links_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES public.annotations(id) ON DELETE CASCADE;


--
-- Name: entity_links entity_links_cluster_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_links
    ADD CONSTRAINT entity_links_cluster_id_fkey FOREIGN KEY (cluster_id) REFERENCES public.clusters(id) ON DELETE CASCADE;


--
-- Name: entity_links entity_links_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_links
    ADD CONSTRAINT entity_links_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: entity_links entity_links_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_links
    ADD CONSTRAINT entity_links_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: entity_links entity_links_wikidata_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity_links
    ADD CONSTRAINT entity_links_wikidata_id_fkey FOREIGN KEY (wikidata_id) REFERENCES public.wikidata(db_id) ON DELETE CASCADE;


--
-- Name: mentions mentions_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES public.annotations(id) ON DELETE CASCADE;


--
-- Name: mentions mentions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: mentions mentions_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: named_entities named_entities_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.named_entities
    ADD CONSTRAINT named_entities_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES public.annotations(id) ON DELETE CASCADE;


--
-- Name: named_entities named_entities_cluster_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.named_entities
    ADD CONSTRAINT named_entities_cluster_id_fkey FOREIGN KEY (cluster_id) REFERENCES public.clusters(id) ON DELETE CASCADE;


--
-- Name: named_entities named_entities_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.named_entities
    ADD CONSTRAINT named_entities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: named_entities named_entities_entity_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.named_entities
    ADD CONSTRAINT named_entities_entity_category_id_fkey FOREIGN KEY (entity_category_id) REFERENCES public.entity_categories(id) ON DELETE CASCADE;


--
-- Name: named_entities named_entities_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.named_entities
    ADD CONSTRAINT named_entities_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: tokens tokens_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: tokens tokens_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: tokens tokens_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: wikidata wikidata_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wikidata
    ADD CONSTRAINT wikidata_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: wikidata wikidata_dataset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wikidata
    ADD CONSTRAINT wikidata_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE;


--
-- Name: wikidata wikidata_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wikidata
    ADD CONSTRAINT wikidata_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20210525145829'),
    ('20210609200427');
