--Category Data--
create table categories (
    id serial primary key,
    categoryname varchar(50)
);

--Implement All Coding Languanges--
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




--Topics Data--
create table topics (
    id serial primary key,
    topictitle varchar(300),
    topiccontent varchar(8000)
);




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
);


-- Table for the posts page following the page after a specific topic is seleced from the topics page
create table posts(    
    id serial primary key,

    postcontent text,
    posttitle varchar(100),

    -- So that users know who made the post
    userid integer references users (id),
    nickname text references users (nickname),

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