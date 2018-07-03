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




//Home Screen Background
var homeBG = "";

//Background Image Selection
//Morning
var morningBG = [
    "/images/backgrounds/morning1.jpg",
    "/images/backgrounds/morning2.jpg",
    "/images/backgrounds/morning3.jpg",
    "/images/backgrounds/morning4.jpg"
]

//Midday
var middayBG = [
    "/images/backgrounds/midday1.jpg",
    "/images/backgrounds/midday2.jpeg",
    "/images/backgrounds/midday3.jpg",
    "/images/backgrounds/midday4.jpg"
]

//Afternoon
var afternoonBG = [
    "/images/backgrounds/afternoon1.jpg",
    "/images/backgrounds/afternoon2.jpg",
    "/images/backgrounds/afternoon3.jpg",
    "/images/backgrounds/afternoon4.jpg"
]

//Night
var nightBG = [
    "/images/backgrounds/night1.jpg",
    "/images/backgrounds/night2.jpeg",
    "/images/backgrounds/night3.jpeg",
    "/images/backgrounds/night4.jpg"
]


//http://api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID=6049e97e68a2e932a3e253ab7d0423a6




//User Profile Page
app.get("/userprofile", ensureAuthenticated, function(request, response) {
var userSession = request.session.passport.user;
siteDB.getUserByGitId(Number(userSession))
.then(function(data) {
    if (data) {
        response.render("profile", {
            data: data,
            layout: "profilepage"
        });
    } else {
        response.redirect("/login");
    }})
        .catch(function(error) { 
            console.log(error); 
        });
});



//Homepage
app.get("/", function(request, response) {
    //Set Background Based on Time
    let currentTime = new Date();
    let hour = currentTime.getHours();

    //Morning
    if (hour >= 6 && hour < 12) { 
        homeBG = morningBG[Math.floor(Math.random() * morningBG.length)];
    }

    //Midday
    if (hour >= 12 && hour < 17) { 
        homeBG = middayBG[Math.floor(Math.random() * middayBG.length)];
    }

    //Afternoon
    if (hour === 17 && hour < 18) { 
        homeBG = afternoonBG[Math.floor(Math.random() * afternoonBG.length)];
    }

    //Night
    if (hour >= 18) { 
        homeBG = nightBG[Math.floor(Math.random() * nightBG.length)];
    }

    
    //Set Page Render
    //Get All Coding Categories
    var userSession = null
    if (request.session && request.session.passport && request.session.passport.user) {
        userSession = request.session.passport.user;
    
    }

    Promise.all([
        siteDB.getUserByGitId(Number(userSession)),
        siteDB.getAllCategories()
    ])
    .then(function(data) {
        console.log( data[0])
        response.render("home", {
            layout: "homepage",
            title: "Good Morning Coders",
            homeBG: homeBG,
            category: data[1],
            profile: data[0],
            isLoggedIn: request.isAuthenticated()
        });
    })
    .catch(function(error) {console.log(error)});
});




//Topics Page
app.get("/category/:id", function(request, response) {
    //Check Category and Existing Topics
    var userSession = request.session.passport.user;
    Promise.all([
        siteDB.getOneCategory(request.params.id),
        siteDB.getAllTopics(request.params.id),
        siteDB.getUserByGitId(Number(userSession)),
        siteDB.getTopicAuthor(request.params.id)
    ])
    .then(function(data) {
        response.render("topics", {       
            layout: "topicspage",
            category: data[0],
            topics: data[1],
            topicauthor: data[2],
            isLoggedIn: request.isAuthenticated()
            
        });
    })
    .catch(function(error) {console.log(error)});
});


//Create New Topic
app.get("/category/:id/new-topic", function(request, response) {
    //Check Category and User topicauthor
    var userSession = request.session.passport.user;
    Promise.all([
    siteDB.getOneCategory(request.params.id),
    siteDB.getUserByGitId(Number(userSession)),
    siteDB.getTopicAuthor(request.body.userid)
    ])
    .then(function(data) {
        response.render("newtopic", {
            layout: "newtopicpage",
            category: data[0],
            topic: data[1],
            isLoggedIn: request.isAuthenticated()
        });
    })
    .catch(function(error) {console.log(error)});
});

app.post("/category/:id/new-topic", function(request, response) {
    //Add Topic Title and Content to Database
    Promise.all([
        siteDB.getOneCategory(request.params.id),
        siteDB.addTopic(request.body.topictitle, request.body.topiccontent, request.params.id, request.body.topicauthor)
    ])
    .then(function(data) {
        response.redirect(`/category/${data[0].id}`);
    })
    .catch(function(error) {console.log(error)});
});




//Topic Details
app.get("/category/:id/topic/:topicid", function(request, response) {
    //Check Category and Topic Information
    var userSession = request.session.passport.user;
    Promise.all([
    siteDB.getOneCategory(request.params.id),
    siteDB.getOneTopic(request.params.topicid),
    siteDB.getUserByGitId(Number(userSession)),
    siteDB.getAllComments(request.params.topicid)
    ])
    .then(function(data) {
        response.render("postedtopic", {
            layout: "topicspage",
            category: data[0],
            topic: data[1],
            comments: data[3],
            topicauthor: data[2],
            commentauthor: data[2],
            isLoggedIn: request.isAuthenticated()
        });
    })
    .catch(function(error) {console.log(error)});
});

app.post("/category/:id/topic/:topicid", function(request, response) {
    //Check Category and Topic Information
    Promise.all([
    siteDB.getOneCategory(request.params.id),
    siteDB.getOneTopic(request.params.topicid),
    siteDB.addComment(request.params.topicid, request.body.userinput, request.body.commentauthor)
    ])
    .then(function(data) {
        console.log(data);
        response.redirect(`/category/${data[0].id}/topic/${data[1].id}`);
    })
    .catch(function(error) {console.log(error)});
});




//Create Server
app.listen(5000, function() {
    console.log("Server: http://localhost:5000");
});
