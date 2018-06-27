//Init PG-Promise
const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "dbName",
  user: "postgres",
  password: ""
};

const db = pgp(cn);




//Site Functions