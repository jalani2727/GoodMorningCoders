-- create table dbName (
--    id serial primary key,
-- );



create table comments (
    id serial primary key,
    UserInput text,
    Username character varying(100) NOT NULL,
);

create table users (
    id serial primary key,
    UserId integer NOT NULL,
    Bio text,
    Username character varying(100) NOT NULL,
    Nickname character varying(100) NOT NULL,
    location character varying(100) DEFAULT 'ATL'::character varying NOT NULL,

    -- These values shouldnt be regulated by users 
    DateJoined date,
    PostsMade integer NOT NULL
);

create table topics(    
    id serial primary key,
    TopicName character varying(500) NOT NULL,
    UserInput text,
    Username character varying(100) NOT NULL,
);