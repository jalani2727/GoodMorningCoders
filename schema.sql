
-- create table dbName (
--    id serial primary key,
-- );



create table comments (
    id serial primary key,
    userid integer references users (id),
    topicid integer references
    userinput text

);


create table posts(    
    id serial primary key,
    userid integer references users (id),
    topicname character varying(500) NOT NULL,
    topiccontent text
);


create table users (
    id serial primary key,
    userid integer NOT NULL,
    bio text,
    username character varying(100) NOT NULL,
    nickname character varying(100) NOT NULL,
    hometown character varying(100) DEFAULT 'ATL',

    -- These values shouldnt be regulated by users 
    datejoined date,
    -- changing number. Not sure of how to do this yet.
    postsmade integer NOT NULL
);

