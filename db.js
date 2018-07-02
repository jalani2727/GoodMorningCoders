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
    return db.any("select * from categories");
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

//Join Categories and Topics
//function uniqueTopics(id) {
//    return db.one("select from categories join topics categories.id = topics.id", [id]);
//}




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
  
  function movePostTopicById (newId, postTitle) {
    return db.query ("update posts set topic if = '$1' where posttitle is ='$2#'", [newId, postTitle] )
  }
  
  
  // Get-Functions
  // Get-Functions for use on all pages
  function getUsernameByUserId (userid) {
    return db.query("select username from column where userid = '$1'", [userid])
  }
  
  function getCategoryNameById(id) {
    return db.any("select categoryname from categories where id = '$1'", [id]);
  }
  
  function getTopicNameById(id) {
    return db.any("select topicname from topics where id = '$1'", [id]);
  }
  
  function getPostTitleById(id) {
    return db.any("select posttitle from posts where id = '$1'", [id]);
  }
  
  function getPostContentById(id) {
    return db.any("select postcontent from posts where id = '$1'", [id]);
  }
  
  
  function getCommentsById(id) {
    return db.any("select commentcontent from comments where id = '$1'", [id]);
  }
  
  
  
  
  
  // Category-Specific Topics Page 
  // Run get functions to display relevant names
  // I beleive a function to show the number of posts per topic goes here 
  
  
  
  // Topic-Specific Posts Page
  // Really just running Get-Functions and using the post count thing i havent looked up yet 
  
  function deletePostById(id) {
    return db.query("delete from posts where id = $1", [id])
  }
  
  // Create-Posts Page 
  function createPost(newpostTitle, newContent) {
    return db.query("insert into posts (posttitle, postcontent) values ('$1#', '$2#')returning id" , [newpostTitle, newContent] );
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
    createUsername,
    createNickname,
    createHometown,
    createBio,
    insertDateCreated,
    moveTopicCategoryById,
    movePostTopicById,
    getUsernameByUserId,
    getCategoryNameById,
    getTopicNameById,
    getPostTitleById,
    getPostContentById,
    getCommentsById,
    deletePostById,
    createPost,
    createComment,
    editComment,
    deleteCommentById,
    editPostTitle,
    editPostContent,
    getAllCategories,
    getOneCategory,
    getAllTopics,
    getOneTopic,
    addTopic
};