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
;




--Topics Data--
create table topics (
    id serial primary key,
    topictitle varchar(300),
    topiccontent varchar(8000),
    topiccategory integer references categories (id),
    topicauthor integer references users (userid)
);



--Comments Data--
create table comments (
    id serial primary key,
    userid integer references topics (id),
    userinput varchar(8000),
    commentauthor integer references users (userid)
);



--Users Data--
create table users (
    userid serial primary key,
    alias varchar(30) NOT NULL,
    github_id integer NOT NULL,
    github_avatar_url varchar(200) NOT NULL,
    github_url varchar(100) NOT NULL,
    join_date timestamp NOT NULL,
    bio varchar(2000),
    github_location varchar(200),
    html_url varchar(100) NOT NULL
);
