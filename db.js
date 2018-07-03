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
// Delete Topic
function deleteTopic(topictitle) {
  return db.query("delete from topics where topictitle = '$1#'", [topictitle])
}




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
    return db.oneOrNone("select * from users where github_id = $1;", [userid]
)
.catch(err => {
    return "lolololololo"});
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
    getAllCategories,
    getOneCategory,
    getAllTopics,
    getOneTopic,
    addTopic,
    getTopicAuthor,
    addUser,
    getUserByGitId,
    addComment,
    getAllComments
}
