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
function getCategories() {
  return db.any('select * from categories');
}

//Get All Categories
function getOneCategory(id) {
  return db.oneOrNone("select * from categories where id=$1", [id]);
}




//Export All Functions
module.exports = {
    getCategories,
    getOneCategory
}