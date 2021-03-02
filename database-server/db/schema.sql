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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clusters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clusters (
    id bigint NOT NULL,
    dataset_id bigint NOT NULL,
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
-- Name: documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents (
    id bigint NOT NULL,
    dataset_id bigint NOT NULL,
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
-- Name: mentions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentions (
    id bigint NOT NULL,
    dataset_id bigint NOT NULL,
    document_id bigint NOT NULL,
    sentence_id integer NOT NULL,
    start_token_id integer NOT NULL,
    end_token_id integer NOT NULL,
    cluster_id bigint NOT NULL,
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
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email text,
    first_name text,
    last_name text
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
-- Name: clusters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters ALTER COLUMN id SET DEFAULT nextval('public.clusters_id_seq'::regclass);


--
-- Name: datasets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.datasets ALTER COLUMN id SET DEFAULT nextval('public.datasets_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: mentions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions ALTER COLUMN id SET DEFAULT nextval('public.mentions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


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
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


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
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: clusters clusters_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: clusters clusters_dataset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE;


--
-- Name: clusters clusters_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


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
-- Name: mentions mentions_cluster_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_cluster_id_fkey FOREIGN KEY (cluster_id) REFERENCES public.clusters(id) ON DELETE CASCADE;


--
-- Name: mentions mentions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: mentions mentions_dataset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE;


--
-- Name: mentions mentions_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: mentions mentions_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentions
    ADD CONSTRAINT mentions_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20210302204457');
