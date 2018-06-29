
-- create table dbName (
--    id serial primary key,
-- );





-- Tables to store information populated by individual users about themselves and their account

create table users (
    id serial primary key,
    userid integer NOT NULL,
    -- These three columns may be unecessary if we are pulling this info from gihub. Or haps the info from github will be pushed to a table and references in these columns
    bio text,
    username character varying(100) NOT NULL,
    hometown character varying(100) DEFAULT 'ATL',

    nickname character varying(100) NOT NULL,
    -- These values shouldnt be regulated by users 
    datejoined date,
    -- changing number. reference some sort of javascript that looks at topicids for a specific userid? (look up post count)
    postsbyuser integer NOT NULL
);


-- Categories Table (Ryan is building this)
create table categories (
   id serial primary key,
   title varchar(50)
);


-- Table for the topics page to show the various topics made by individual users. Needs references to other tables for information
create table topics (
    id serial primary key,
    topicid integer,
    userid integer references users (id),

    -- We'll manually input the topics to post about like General Discussion posts, Collaboration posts, Questions posts
    topicname character varying(500) NOT NULL,
)


-- Table for the posts page following the page after a specific topic is seleced from the topics page
create table posts(    
    id serial primary key,
    topiccontent text

    -- So that users know who made the post
    userid integer references users (id),
    nickname text references users (nickname),
    numberofcomments integer references ???? (???), --(look up post count)

    -- So the user knows what topic they're posting under 
    topicid integer references topics (topicid),
    topicname text references topics (topicname),
);


create table comments (
    id serial primary key,
    userid integer references users (id),
    commentid integer references comments (id)
    userinput text
);






