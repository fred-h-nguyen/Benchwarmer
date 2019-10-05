var db = require("../models");
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true, null);
msf.authenticate(process.env.API_KEY, process.env.API_PASS);

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var user = req.user;
    function playerPull(season, position, stat) {
      msf
        .getData("nfl", season, "cumulative_player_stats", "json", {
          limit: "15",
          position: position,
          force: true,
          sort: "stats." + stat
        })
        .then(function(response) {
          var playerData = response.cumulativeplayerstats.playerstatsentry;
          if (user) {
            db.fbRoster
              .findAll({ where: { ownerId: user.id } })
              .then(function(roster) {
                console.log(roster);
                res.render("index", {
                  user: user,
                  roster: roster,
                  playerData: playerData
                });
              });
          } else {
            res.render("index", {
              user: user,
              playerData: playerData
            });
          }
        });
    }
    playerPull("current", "qb", "Passing-Yds.D");
  });

  //Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup", {
      logged: false
    });
  });

  // Load example page and pass in an example by id
  app.get("/profile", function(req, res) {
    var user = req.user;
    res.render("profile", {
      user: user
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
