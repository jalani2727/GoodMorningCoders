
-- create table dbName (
--    id serial primary key,
-- );





-- Tables to store information populated by individual users about themselves and their account

create table users (
    id serial primary key,
    userid integer NOT NULL,
    -- These three columns may be unecessary if we are pulling this info from gihub. Or haps the info from github will be pushed to a table and references in these columns
    bio text,
    username varchar(100) NOT NULL,
    hometown varchar(100) DEFAULT 'ATL',

    nickname varchar(100) NOT NULL,
    -- These values shouldnt be regulated by users 
    datejoined date,
    -- changing number. reference some sort of javascript that looks at topicids for a specific userid? (look up post count)
    postsbyuser integer NOT NULL
);


-- Categories Table
create table categories (
   id serial primary key,
--    manually input the categories into the table
   categoryname varchar(50)
);


-- Table for the topics page to show the various topics made by individual users. Needs references to other tables for information
create table topics (
    id serial primary key,
    -- We'll manually input the topics into the table 
    topicname varchar(50)
    -- so the user know what category they're in
    categoryid integer references categories (categoryname),
);


-- Table for the posts page following the page after a specific topic is seleced from the topics page
create table posts(    
    id serial primary key,
    postcontent text
    postname varchar(100)

    -- So that users know who made the post
    userid integer references users (id),
    nickname text references users (nickname),
    numberofcomments integer references ???? (???), --(look up post count)

    -- So the user knows what category and topic they're posting under 
    topicid integer references topics (id),
    topicname text references topics (topicname),
    categoryname text references categories (categoryname)
);


-- For use on the post-specific post page
create table comments (
    id serial primary key,
    userid integer references users (id),
    commentid integer references comments (id)
    userinput text
);






