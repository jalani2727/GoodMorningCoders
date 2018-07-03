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




//Category Functions
//Get All Categories
function getAllCategories() {
<<<<<<< HEAD
    return db.any('select * from categories');
=======
    return db.any("select * from categories");
>>>>>>> f6f0d5967ed853e137dfbaf963f411d22a8b10e0
}

//Get All Categories
function getOneCategory(id) {
    return db.oneOrNone("select * from categories where id=$1", [id]);
}

//Topic Functions
//Get All Topics
function getAllTopics(id) {
  console.log(id)
  return db.any("select * from topics where topiccategory=$1", [id]);
}

//Get One Topic
function getOneTopic(id) {
  return db.oneOrNone("select * from topics where id=$1", [id]);
}

//Add Topic
function addTopic(topictitle, topiccontent, topiccategory) {
  return db.one("insert into topics (topictitle, topiccontent, topiccategory) values ('$1#', '$2#', '$3#') returning id", [topictitle, topiccontent, topiccategory]);
}
// Delete Topic
function deleteTopic(topictitle) {
  return db.query("delete from topics where topictitle = '$1#'", [topictitle])
}



<<<<<<< HEAD
// Users Page Functions 

function addUser(alias,github_id,github_avatar_url,github_url,join_date,bio)
{console.log("about to add user")
  return db.query("insert into users (alias, github_id, github_avatar_url, github_url, join_date, bio) VALUES ('$1#', $2, '$3#', '$4#', '$5#', '$6#') returning userid",
      [alias,github_id,github_avatar_url,github_url,join_date,bio])
    
      
}

function editUserInfo(alias,bio){
  return db.query("update users set bio= $1, alias= $2 ")
}
  
  
  // Get-Functions
  // Get-Functions for use on all pages
  function getGithubData() {
    return db.query("select * from users")
  }

  function getUserByGitId (userid) {
    console.log(userid)
    console.log("AJHDIHGFOIAGOS")
    return db.oneOrNone("select * from users where github_id = $1;", [userid]);
  }
 
  
  
  

  
  // Post Display Page 
  // use the get functions to show the post title and contents
  
  function editComment(editedComment) {
    return db.query("update comments set commentcontent = '$1#'", [editedComment]);
  }
  
  function createComment(newComment) {
    return db.query("insert into comments (commentcontent) values ('$1#')", [newComment]);
  }
  
  function deleteCommentById(id) {
    return db.query("delete from comments where id= '$1'", [id])
  }
  
  
  // Update-Posts Page
  function editPostTitle(editedTitle) {
    return db.query("update posts set posttitle = '$1#'", [editedTitle])
  }
  
  function editPostContent(editedContent) {
    return db.query("update posts set postcontent = '$1#'", [editedContent])
  }
  
  
  
  
  module.exports = {
=======

//Topic Functions
//Get All Topics
function getAllTopics(id) {
    return db.any("select * from topics where topiccategory=$1", [id]);
}

//Get One Topic
function getOneTopic(id) {
    return db.oneOrNone("select * from topics where id=$1", [id]);
}

//Add Topic
function addTopic(topictitle, topiccontent, topiccategory, topicauthor) {
    return db.one("insert into topics (topictitle, topiccontent, topiccategory, topicauthor) values ('$1#', '$2#', '$3#', '$4#') returning id", [topictitle, topiccontent, topiccategory, topicauthor]);
}

//Get Topic Author
function getTopicAuthor(id) {
    return db.any("select * from topics where topicauthor=$1", [id]);
}




//User Functions
//Create User
function addUser(alias, github_id, github_avatar_url, github_url, join_date, bio, github_location, html_url) {
    return db.query("insert into users (alias, github_id, github_avatar_url, github_url, join_date, bio, github_location, html_url) values ('$1#', $2, '$3#', '$4#', '$5#', '$6#', '$7#', '$8#') returning userid",
        [alias, github_id, github_avatar_url, github_url, join_date, bio, github_location, html_url])     
}

function getUserByGitId (userid) {
    return db.oneOrNone("select * from users where github_id = $1;", [userid]);
}




//Comment Functions
//Create Comment
function addComment(userid, userinput, commentauthor) {
    return db.one("insert into comments (userid, userinput, commentauthor) values ('$1#', '$2#', '$3#') returning id", [userid, userinput, commentauthor]);
}

//Get All Comments
function getAllComments(id) {
    return db.any("select * from comments where userid=$1", [id]);
}




//Export All Functions
module.exports = {
>>>>>>> f6f0d5967ed853e137dfbaf963f411d22a8b10e0
    getAllCategories,
    getOneCategory,
    getAllTopics,
    getOneTopic,
    addTopic,
<<<<<<< HEAD
    deleteTopic,
    addUser,
    editUserInfo,
    getGithubData,
    getUserByGitId,
    editComment,
    createComment,
    deleteCommentById,
    editPostTitle,
    editPostContent

  };
=======
    getTopicAuthor,
    addUser,
    getUserByGitId,
    addComment,
    getAllComments
}
>>>>>>> f6f0d5967ed853e137dfbaf963f411d22a8b10e0
