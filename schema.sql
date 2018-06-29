create table categories (
    id serial primary key,
    categoryname varchar(50)
);

insert into categories (categoryname)
values 
('HTML'),
('CSS'),
('JavaScript'),
('Ajax'),
('Node'),
('Python'),
('C++'),
('C#'),
('C'),
('PHP'),
('SQL'),
('Java'),
('Ruby'),
('Perl')


create table comments (
    id serial primary key,
    userid integer references users (id),
    userinput text
);

create table topics(    
    id serial primary key,
    userid integer references users (id),
    topicname character varying(500) NOT NULL,
    userinput text
);



-- Tables to store information populated by individual users about themselves and their account


create table users (
    id serial primary key,
    userid integer NOT NULL,
    -- These three columns may be unecessary if we are pulling this info from gihub. Or haps the info from github will be pushed to a table and references in these columns
    bio text,

    username character varying(100) NOT NULL,
    nickname character varying(100) NOT NULL,
    location character varying(100) DEFAULT 'ATL',

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
    -- so that we can move the topic to another category with a move function
    categoryid integer references categories (id),
);


-- Table for the posts page following the page after a specific topic is seleced from the topics page
create table posts(    
    id serial primary key,

    postcontent text,
    posttitle varchar(100),

    -- So that users know who made the post
    userid integer references users (id),
    nickname text references users (nickname),
    numberofcomments integer references ???? (???), --(look up 'post count sql' on google )

    -- so that admins can move the topic to another topic with a move function
    topicid integer references topics (id),
    
);



-- For use on the Post Display page
create table comments (
    id serial primary key,
    userid integer references users (id),
    commentid integer references comments (id),
    commentcontent varchar(500)
);








