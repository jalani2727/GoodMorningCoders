--Category Data--
create table categories (
    id serial primary key,
    categoryname varchar(50)
);

--Implement All Coding Languages--
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
    alias varchar(30) not null,
    github_id integer not null,
    github_avatar_url varchar(200) not null,
    join_date timestamp not null,
    bio varchar(2000),
    github_location varchar(200),
    html_url varchar(100) not null
);




--Weather Data--
create table weather (
    id serial primary key,
    temperature integer not null,
    city varchar(200),
    sky_description varchar(200)
);