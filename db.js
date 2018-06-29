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


//Site Functions for index.js

// to use: 
// <functionName>()
//  .then((data) => {console.log(data); })
//  .catch((error) => {console.log(error); });



// Topic Section functions
function createTopic(newTopicTitle, newContent) {
  return db.query("insert into posts (topicname, topiccontent) values ('$1#', '$2#')returning id" , [newTopicTitle, newContent] );
}

function editTopicTitle(newTitle) {
  return db.query("update posts set topicname = '$1#'", [newTitle])
}

function editTopicContent(editedContent) {
  return db.query("update posts set topiccontent = '$1#'", [editedContent])
}

function deleteTopicById(id) {
  return db.query("delete from posts where id = $1", [id])
}


// Comments Section Functions 
function postComment(newPost) {
  return db.query("insert into comments (topiccontent) values ('$1#') returning id", [newPost])
}

function editComment(editedPost) {
  return db.query("update comments set topiccontent = '$1#'", [editedPost])
}

function deleteCommentById(id) {
  return db.query("delete from comments where id= '$1'", [id])
}

function searchTopic(searchString) {
  return db.query("select * from posts where topicname ilike '%$1#%'", [searchString])
}


// Users Page Functions 
function createUsername (newName) {
  return db.query("insert into users (username) values ('$1#') returning id", [newName])
}

function createNickname (newName) {
  return db.query("insert into users (nickname) values ('$1#') returning id", [newName])
}

function createHometown (city) {
  return db.query("insert into users (hometown) values ('$1#') returning id" [city])
}

function createBio (textInput) {
  return db.query("insert into users (bio) values ('$1#') returning id", [textInput])
}

function insertDateCreated(date) {
  return db. query("insert into users (datejoined) values (to_date(('$1#', 'DD/MM/YYYY'))", [date]) //pretty sure this syntax is wrong. not sure if this would do anything in sql-talk. the date being passed in also needs to be configured to only be the current date
}


module.exports = {
  createTopic,
  editTopicTitle,
  editTopicContent,
  deleteTopicById,
  postComment,
  deleteCommentById,
  searchTopic,
  createUsername,
  createNickname,
  createBio,
  createHometown,
  inserstDateCreated
}