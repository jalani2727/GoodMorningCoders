//Init PG-Promise
const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "Good-morning-coders",
  user: "postgres",
  password: ""
};

const db = pgp(cn);


//Site Functions

// to use: 
// <functionName>()
//  .then((data) => {console.log(data); })
//  .catch((error) => {console.log(error); });





// Topic Section functions
function createTopic(newTopicTitle, newContent) {
  return db.query("insert into topics (topicname, userinput) values ('$1#', '$2#')returning id" , [newTopicTitle, newContent] );
}

function editTopicTitle(newTitle) {
  return db.query("update topics set topicname = $1#", [newTitle])
}

function editTopicContent(editedContent) {
  return db.query("update topics set userinput = $1#", [editedContent])
}

function deleteTopicById(id) {
  return db.query("delete from topics where id = $1", [id])
}


// Comments Section Functions 
function postComment(newPost) {
  return db.query("insert into comments (userinput) values ('$1#') returning id", [newPost])
}

function editComment(editedPost) {
  return db.query("update comments set userinput = $1#", [editedPost])
}

function deleteCommentById(id) {
  return db.query("delete from comments where id= $1", [id])
}

function searchTopic(searchString) {
  return db.query("select * from topics where topicname ilike '%$1#%'", [searchString])
}


// Users Table Functions 
function createUsername (newName) {
  return db.query("insert into users (username) values ('$1#') returning id", [newName])
}

function createNickname (newName) {
  return db.query("insert into users (nickname) values ('$1#') returning id", [newName])
}

function createBio (textInput) {
  return db.query("insert into users (bio) values ('$1#') returning id", [textInput])
}
