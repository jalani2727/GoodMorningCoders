-- createTopic(newTopic, newContent)
insert into topics
(TopicName, UserInput)
values
('$1#', '$2#')
returning id , [newTopic, newContent] 

-- editTopicTitle(newName)
update topics set TopicName = $1# 

-- editTopicContent(editedContent)
update topics set UserInput = $1#

-- postComment(newPost)
insert into comments (UserInput) values ('$1#') returning id, [newPost]

-- editComment(editedPost)
update comments set UserInput = $1# , [editedPost]

-- deleteTopicByID
delete from topics where id = $1

-- deleteCommentByID
delete from comments where id= $1

-- searchTopic(searchString)
select * from topics where TopicName ilike '%searchString%'








-- Figure out how to append the date that a profile is created to '<the literal date>' for a function that adds the dat the profile was created via github authentication
insert into users (datejoined) values (to_date('<the literal dare>', 'DD/MM/YYYY'));

