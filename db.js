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
//Get All Categories
function getAllCategories() {
    return db.any('select * from categories');
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
  
  function getCategoryNameById(id) {
    return db.any("select categoryname from categories where id = '$1'", [id]);
  }
  
  function getTopicNameById(id) {
    return db.any("select topicname from topics where id = '$1'", [id]);
  }
  

  function getCommentsById(id) {
    return db.any("select commentcontent from comments where id = '$1'", [id]);
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
    getAllCategories,
    getOneCategory,
    getAllTopics,
    getOneTopic,
    addTopic,
    deleteTopic,
    addUser,
    editUserInfo,
    getGithubData,
    getUserByGitId,
    getCategoryNameById,
    getTopicNameById,
    getCommentsById,
    editComment,
    createComment,
    deleteCommentById,
    editPostTitle,
    editPostContent

  };