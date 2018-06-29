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

// Users Page Functions 
// First three functions to have some interaction with GitHub JSON Data
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



// Developer/Admin Functions
function moveTopicCategoryById(newId, topicName) {
  return db.query("update topics set categoryid ='$1' where topicname is ='$2#'",[newId, topicName])
}

function movePostTopicById (newId, postName) {
  return db.query ("update posts set topicif = '$1' where postname is ='$2#'", [newId, postName] )
}


// Get-Functions
// Get-Functions for use on all pages
function getCategoryNameById(id) {
  return db.any("select categoryname from categories where id = '$1'", [id]);
}

function getTopicNameById(id) {
  return db.any("select topicname from topics where id = '$1'", [id]);
}

function getPostNameById(id) {
  return db.any("select postname from posts where id = '$1'", [id]);
}
// Display-Posts Page 
// Get-Functions 










// Category-Specific Topics Page 

// I beleive a function to show the number of posts per topic goes here 



// Display Posts Page


function deletepostById(id) {
  return db.query("delete from posts where id = $1", [id])
}



// Create-Posts Page 
// Functions
function createpost(newpostTitle, newContent) {
  return db.query("insert into posts (postname, postcontent) values ('$1#', '$2#')returning id" , [newpostTitle, newContent] );
}

function editpostTitle(newTitle) {
  return db.query("update posts set postname = '$1#'", [newTitle])
}


function editpostcontent(editedContent) {
  return db.query("update posts set postcontent = '$1#'", [editedContent])
}





// Create Comment Page 
function postComment(newPost) {
  return db.query("insert into comments (postcontent) values ('$1#') returning id", [newPost])
}

function editComment(editedPost) {
  return db.query("update comments set postcontent = '$1#'", [editedPost])
}

function deleteCommentById(id) {
  return db.query("delete from comments where id= '$1'", [id])
}






module.exports = {
  getCategoryNameById,
  getTopicNameById,
  createpost,
  editpostTitle,
  editpostcontent,
  deletepostById,
  searchpost,
  postComment,
  deleteCommentById,
  createUsername,
  createNickname,
  createBio,
  createHometown,
  insertDateCreated
};