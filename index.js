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


//Weather API
weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID=6049e97e68a2e932a3e253ab7d0423a6"

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
    siteDB.getCategories()
    .then((data) => {
        console.log(data);
        response.render("home", {
            layout: "homepage",
            title: "Good Morning Coders",
            homeBG: homeBG,
            category: data,
            isLoggedIn: request.isAuthenticated()
        });
    })
    .catch((error) => {console.log(error)});
});




//Topics Page
app.get("/:id", function(request, response) {
    siteDB.getOneCategory(request.params.id)
    .then((data) => {
        console.log(data);
        response.render("topics", {       
            layout: "topicspage",
            category: data,
            isLoggedIn: request.isAuthenticated()
        });
    })
    .catch((error) => {console.log(error)});
});


//Create New Topic
app.get("/:id/new-topic", (request, response) => {
    todoList.getOneCategory(request.params.id)
    .then((data) => {
        response.render("topics", data);
    })
    .catch((error) => {console.log(error)});
});

app.post("/new-topic", (request, response) => {});




//Topics Page
// app.get("/topics/:id", function(request, response) {
//     siteDB.getCategories(request.params.id);
//         .then((category) => {
//             console.log(category);
//             response.render("categories", category {});

//         })
//         .catch((error) => {console.log(error)});
// });



//Create Server
app.listen(5000, () => {
    console.log("Server: http://localhost:5000");
});