const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const session = require('express-session');
var FileStore = require('session-file-store')(session);

// const cookieParser = require('cookie-parser')
// const users = require('./users');

// Accept the express `app` instance as an arg
// That way, we don't declare it here.
const setupAuth = (app) => {

  // #1 set up cookie middleware
  // app.use(cookieParser());

  const siteDB = require("./db");


  // #2 set up session middleware
  app.use(session({
    secret: 'BAJCKBjdbajkbjkchhjcvsdcbha7826674523742',
    resave: true,
    saveUninitialized: true,
    store: new FileStore()
  }));

  // #3 set up passport strategy
  passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/github/auth"
  }, (accessToken, refreshToken, profile, done) => {
    siteDB.getUserByGitId(Number(profile.id))
    .then((data) => {
      if(data) {
        return done(null, profile);
      } else {
        console.log(profile)
        siteDB.addUser(profile._json.name, profile.id, profile._json.avatar_url, profile._json.url, profile._json.created_at, profile._json.bio, profile._json.location, profile._json.html_url)
        .then(() =>{
          console.log("added the user");
          return done(null, profile);
        });
      }
    });
  }
));

    // // TODO: replace this with code that finds the user
    // // in the database.
    // let theUser = users.find(u => u.id === profile.id);

    // if (theUser) {
    //   return done(null, user);
    // } else {
    //   return done({ message: 'That totally did not work'}, null);
    // }

  


  // #4 call passport.serializeUser
  // This configures how passport turns a user object
  // into something it can track in a session.
  passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    console.log('we are serializing');
    console.log(user);

    // This adds the following to the session:
    // {
    //   "passport": {
    //     "user": "1090173"
    //   }
    // }
    done(null, user.id);

    // Meaning, you can identify the user via:
    // req.session.passport.user
  });

  // #5 call passport.serializeUser
  // This configures how passport checks what's in the
  // session to see if the login is still valid.
  passport.deserializeUser(function(id, done) {
    console.log('we are deserializing');
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    console.log(id);
    done(null, id);
  });

  // #6 initialize passport middleware and register it with express
  app.use(passport.initialize());

  // #7 start passport's session management middleware and
  // register it with express
  app.use(passport.session());

  // #8 register our login, logout, and auth routes
  app.get('/login', passport.authenticate('github'));

  app.get('/logout', function(req, res, next) {
    console.log('logging out');
    req.session.destroy((err) => {
      if(err) return next(err)
      req.logout()
      res.redirect('/')
    });
  });

  // Our auth route is what Github will redirect to after the user logs in
  // and says it's ok to use our app.
  // This is treated as a protected route because we have to confirm that Github
  // actually said it was ok.
  // The actual route handler is just going to redirect us to the home page.
  app.get('/github/auth',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      // if you don't have your own route handler after the passport.authenticate middleware
      // then you get stuck in the infinite loop

      console.log('you just logged in');
      console.log(req.session.passport.user);
      console.log(req.isAuthenticated());
      req.session.save(() => {
        res.redirect('/');
      });
    }
  );

  // That's it.
  // That's the end of our passport setup for github
}


// This is a convenience method that we'll use as a route
// handler. It checks if the request is associated with a
// valid, logged-in user. If so, we just hand off to the `next()`
// route handler. If not, then take them to the login route.
const ensureAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log('we are all good');
    return next();
  }

  console.log('clearly, they are not authenticated');
  // denied. redirect to login
  res.redirect('/');
}

// Our default export is the `setupAuth` function.
// That will be used like so:
// const setupAuth = require('./auth');
// setupAuth(app);
module.exports = setupAuth;

// Secondarily, we want to export our route handler that checks
// for a logged-in user.
// That gets pulled in like so:
// const ensureAuthenticated = require('../auth').ensureAuthenticated;
module.exports.ensureAuthenticated = ensureAuthenticated;