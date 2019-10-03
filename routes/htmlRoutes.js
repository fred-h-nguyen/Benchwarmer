var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var user = req.user;
    if (user) {
      db.fbRoster
        .findAll({ where: { ownerId: user.id } })
        .then(function(roster) {
          res.render("index", {
            user: user,
            roster: roster
          });
        });
    } else {
      res.render("index", {
        user: user
      });
    }
  });

  //Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup", {
      logged: false
    });
  });

  // Load example page and pass in an example by id
  app.get("/roster", function(req, res) {
    var logged = req.user;
    db.fbRoster.findAll({}).then(function(roster) {
      res.render("index", {
        logged: logged,
        roster: roster
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
