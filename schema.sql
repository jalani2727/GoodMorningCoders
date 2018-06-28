-- create table dbName (
--    id serial primary key,
-- );



create table comments (
    id serial primary key,
    userid integer references users (id)
    userinput text,
);

create table topics(    
    id serial primary key,
    userid integer references users (id)
    topicname character varying(500) NOT NULL,
    userinput text,
);

create table users (
    id serial primary key,
    userid integer NOT NULL,
    bio text,
    username character varying(100) NOT NULL,
    nickname character varying(100) NOT NULL,
    location character varying(100) DEFAULT 'ATL'::character varying NOT NULL,

    -- These values shouldnt be regulated by users 
    datejoined date,
    postsmade integer NOT NULL
);

