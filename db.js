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
  return db.query("insert into topics (TopicName, UserInput) values ('$1#', '$2#')returning id" , [newTopicTitle, newContent] );
}

function editTopicTitle(newTitle) {
  return db.query("update topics set TopicName = $1#", [newTitle])
}

function editTopicContent(editedContent) {
  return db.query("update topics set UserInput = $1#", [editedContent])
}

function deleteTopicById(id) {
  return db.query("delete from topics where id = $1", [id])
}


// Comments Section Functions 
function postComment(newPost) {
  return db.query("insert into comments (UserInput) values ('$1#') returning id", [newPost])
}

function editComment(editedPost) {
  return db.query("update comments set UserInput = $1#", [editedPost])
}

function deleteCommentById(id) {
  return db.query("delete from comments where id= $1", [id])
}

function searchTopic(searchString) {
  return db.query("select * from topics where TopicName ilike '%$1#%'", [searchString])
}


// Users Table Functions 
function createUsername (newName) {
  return db.query("insert into users (Username) values ('$1#') returning id", [newName])
}

function createNickname (newName) {
  return db.query("insert into users (Nickname) values ('$1#') returning id", [newName])
}

function createBio (textInput) {
  return db.query("insert into users (Bio) values ('$1#') returning id", [textInput])
}
