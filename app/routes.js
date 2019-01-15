module.exports = function(app, passport) {

  var Meme = require('../models/meme')

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.redirect('/feed'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });



    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/addMeme', function(req, res) {
      var user = req.user;
      var joke = req.body.joke;
      var email = user.local.email;
      console.log(joke);
      //var jokeGoose = mongoose.model('Meme', memeSchema);
      var meme = new Meme({meme: joke, user: email})
      meme.save(function(err) {
        console.log("Meme saved: " + meme)
        if (err) throw err;
      })
      res.redirect("/profile")

    })
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
      //  var memesNew;
        Meme.find({}, function (err, memes){

            console.log(memes)
        //  memesNew = memes;
          res.render('profile.ejs', {
              user : req.user,
              memes: memes  // get the user out of session and pass to template
          });

        });



    });

    app.get('/feed', isLoggedIn, function(req, res) {

      Meme.find({}, function (err, memes){

          console.log(memes)
        res.render("feed.ejs", {memes:memes});

      });
    });

        //res.render('feed.ejs', {
        //    user1 : req.user // get the user out of session and pass to template
            //Meme.find({}, function(err, memes) {
              //console.log(memes);
            //})};


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
