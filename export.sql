--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

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
-- Name: address; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.address (
    id smallint NOT NULL,
    street text,
    city text,
    department text
);


ALTER TABLE public.address OWNER TO fuyuki;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO fuyuki;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: authentication; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.authentication (
    person_id smallint,
    username text,
    password text
);


ALTER TABLE public.authentication OWNER TO fuyuki;

--
-- Name: authentication_person_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.authentication_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authentication_person_id_seq OWNER TO fuyuki;

--
-- Name: authentication_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.authentication_person_id_seq OWNED BY public.authentication.person_id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.books (
    isbn character varying(13) NOT NULL,
    title text,
    author text,
    description text,
    cover text,
    site_id bigint NOT NULL,
    borrower_id integer,
    reserved_id integer,
    tags text
);


ALTER TABLE public.books OWNER TO fuyuki;

--
-- Name: books_site_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.books_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_site_id_seq OWNER TO fuyuki;

--
-- Name: books_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.books_site_id_seq OWNED BY public.books.site_id;


--
-- Name: customer; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    email text,
    phone text,
    person_id integer NOT NULL
);


ALTER TABLE public.customer OWNER TO fuyuki;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO fuyuki;

--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: customer_person_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.customer_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_person_id_seq OWNER TO fuyuki;

--
-- Name: customer_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.customer_person_id_seq OWNED BY public.customer.person_id;


--
-- Name: cutomer; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.cutomer (
    id smallint NOT NULL,
    email text,
    phone text,
    person_id smallint
);


ALTER TABLE public.cutomer OWNER TO fuyuki;

--
-- Name: person; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.person (
    id smallint NOT NULL,
    first_name text,
    last_name text,
    address_id smallint,
    role text
);


ALTER TABLE public.person OWNER TO fuyuki;

--
-- Name: person_address_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.person_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_address_id_seq OWNER TO fuyuki;

--
-- Name: person_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.person_address_id_seq OWNED BY public.person.address_id;


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO fuyuki;

--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.sessions (
    session_id smallint NOT NULL,
    person_id smallint,
    token text
);


ALTER TABLE public.sessions OWNER TO fuyuki;

--
-- Name: site; Type: TABLE; Schema: public; Owner: fuyuki
--

CREATE TABLE public.site (
    id integer NOT NULL,
    location character varying(30)
);


ALTER TABLE public.site OWNER TO fuyuki;

--
-- Name: site_id_seq; Type: SEQUENCE; Schema: public; Owner: fuyuki
--

CREATE SEQUENCE public.site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_id_seq OWNER TO fuyuki;

--
-- Name: site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fuyuki
--

ALTER SEQUENCE public.site_id_seq OWNED BY public.site.id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: authentication person_id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.authentication ALTER COLUMN person_id SET DEFAULT nextval('public.authentication_person_id_seq'::regclass);


--
-- Name: books site_id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.books ALTER COLUMN site_id SET DEFAULT nextval('public.books_site_id_seq'::regclass);


--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: customer person_id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.customer ALTER COLUMN person_id SET DEFAULT nextval('public.customer_person_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: person address_id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.person ALTER COLUMN address_id SET DEFAULT nextval('public.person_address_id_seq'::regclass);


--
-- Name: site id; Type: DEFAULT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.site ALTER COLUMN id SET DEFAULT nextval('public.site_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.address (id, street, city, department) FROM stdin;
1	unknown	fontainebleau	idf
\.


--
-- Data for Name: authentication; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.authentication (person_id, username, password) FROM stdin;
1	fuyuki	test
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.books (isbn, title, author, description, cover, site_id, borrower_id, reserved_id, tags) FROM stdin;
9780439064873	Harry Potter and the Chamber of Secrets	J.K. Rowling	Harry returns to Hogwarts for his second year.	https://covers.openlibrary.org/b/id/2407281-M.jpg	1	\N	\N	Fantasy, Young Adult, Magic
9780553573404	A Game of Thrones	George R.R. Martin	The first book in the epic fantasy series "A Song of Ice and Fire".	https://covers.openlibrary.org/b/id/8310936-M.jpg	1	3	5	Fantasy, Epic, Politics
9780061120084	To Kill a Mockingbird	Harper Lee	A classic novel about justice and racial inequality in the American South.	https://covers.openlibrary.org/b/id/8225266-M.jpg	1	\N	8	Classic, Historical, Social Issues
9781400079179	Life of Pi	Yann Martel	A magical adventure of survival and spirituality on the open sea.	https://covers.openlibrary.org/b/id/8284877-M.jpg	1	12	\N	Adventure, Spirituality, Survival
9780140449266	Crime and Punishment	Fyodor Dostoevsky	A gripping tale of morality, guilt, and redemption.	https://covers.openlibrary.org/b/id/8124951-M.jpg	1	\N	\N	Classic, Philosophy, Psychological
9780451524935	1984	George Orwell	A dystopian novel about totalitarianism and surveillance.	https://covers.openlibrary.org/b/id/8231981-M.jpg	1	10	7	Dystopian, Science Fiction, Political
9780545010221	Harry Potter and the Deathly Hallows	J.K. Rowling	The final book in the Harry Potter series.	https://covers.openlibrary.org/b/id/8125034-M.jpg	1	\N	\N	Fantasy, Young Adult, Magic
9780439139601	Harry Potter and the Prisoner of Azkaban	J.K. Rowling	Harry discovers family secrets and encounters Sirius Black.	https://covers.openlibrary.org/b/id/8225421-M.jpg	1	4	\N	Fantasy, Young Adult, Mystery
9781974748983	Frieren Beyond Journey s End, Vol. 11	Kanehito Yamada;Tsukasa Abe		https://covers.openlibrary.org/b/id/14799164-M.jpg	2	\N	\N	\N
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.customer (id, email, phone, person_id) FROM stdin;
\.


--
-- Data for Name: cutomer; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.cutomer (id, email, phone, person_id) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.person (id, first_name, last_name, address_id, role) FROM stdin;
1	fuyuki	fuyuki	1	hhe
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.sessions (session_id, person_id, token) FROM stdin;
\.


--
-- Data for Name: site; Type: TABLE DATA; Schema: public; Owner: fuyuki
--

COPY public.site (id, location) FROM stdin;
1	fontainebleau
2	Aucun
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.address_id_seq', 1, false);


--
-- Name: authentication_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.authentication_person_id_seq', 1, false);


--
-- Name: books_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.books_site_id_seq', 1, false);


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.customer_id_seq', 1, false);


--
-- Name: customer_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.customer_person_id_seq', 1, false);


--
-- Name: person_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.person_address_id_seq', 1, false);


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.person_id_seq', 1, false);


--
-- Name: site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fuyuki
--

SELECT pg_catalog.setval('public.site_id_seq', 2, true);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (isbn);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: cutomer cutomer_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.cutomer
    ADD CONSTRAINT cutomer_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: site site_pkey; Type: CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_pkey PRIMARY KEY (id);


--
-- Name: authentication authentication_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: books books_site_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.site(id);


--
-- Name: customer customer_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: cutomer cutomer_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.cutomer
    ADD CONSTRAINT cutomer_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: person person_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- Name: sessions sessions_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fuyuki
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: TABLE books; Type: ACL; Schema: public; Owner: fuyuki
--

GRANT SELECT,INSERT ON TABLE public.books TO remote;


--
-- Name: TABLE site; Type: ACL; Schema: public; Owner: fuyuki
--

GRANT SELECT ON TABLE public.site TO remote;


--
-- PostgreSQL database dump complete
--

