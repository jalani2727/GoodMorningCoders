//Init
//Account Authentication
const dotenv = require("dotenv");
dotenv.config();

const setupAuth = require("./auth");
const ensureAuthenticated = require("./auth").ensureAuthenticated;


//Express.js
const express = require("express");
const app = express();
const static = express.static;
const expressHbs = require("express-handlebars");

app.engine(".hbs", expressHbs({defaultLayout: "layout", extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(static("public"));


//Route Authentication
setupAuth(app);


//Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));


//Site Database
const siteDB = require("./db");




//Good Morning Coders Homepage
app.get("/", ensureAuthenticated, function(request, response) {
    response.render("home", {
        layout: "homepage",
        title: "Good Morning Coders",
        isLoggedIn: request.isAuthenticated()
    });
});




//Create Server
app.listen(5000, () => {
    console.log("Server: http://localhost:5000");
});