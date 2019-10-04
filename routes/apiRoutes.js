require("dotenv").config();
//required models and passport for api routes
var db = require("../models");
var passport = require("../config/passport");
//var axios = require("axios");
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true, null);
msf.authenticate(process.env.API_KEY, process.env.API_PASS);

module.exports = function(app) {
  // Get all examples

  // passport login post
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  //Passport sign-up post
  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  //Logout get route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //api call to get table of players
  app.get("/api/roster", function(req, res) {
    db.fbRoster.findAll({}).then(function(roster) {
      res.json(roster);
      //res.render(handlebars for table of players)
    });
  });

  // Create a new player
  app.post("/api/roster", function(req, res) {
    var user = req.user;
    var player = req.body;
    player.ownerID = user.id;
    console.log(player);
    db.fbRoster.create(player).then(function(player) {
      res.json(player);
    });
  });

  // Delete a player
  app.delete("/api/roster/:playerID", function(req, res) {
    db.fbRoster
      .destroy({
        where: { id: req.params.playerID }
      })
      .then(function(player) {
        res.json(player);
      });
  });

  // Delete a User
  app.delete("/api/user/:userID", function(req, res) {
    db.User.destroy({
      where: { id: req.params.userID }
    }).then(function(player) {
      res.json(player);
    });
  });

  //get call where mysportsfeeds-node makes a call on page load
  app.get("/api/rostersuggestion", function(req, res) {
    //mysportsfeeds-node call goes here of 15 players
    //after the .then res.render to page where table query will show
    //Updated data pull from mySportsFeeds.com:

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
          //console.log(playerData);
          res.json(playerData);
        });
    }
    playerPull("current", "qb", "Passing-Yds.D");
  });

  //get call for query where axios will make call based on user query
  app.get("/api/players", function(req, res) {
    //axios call here for the query
    //.then empty the div with player suggestions and now append searched players
    var season = req.query.season;
    var position = req.query.position;
    var playerName = req.query.playerName;
    var stat = req.query.stat;
    playerName = playerName.replace(/ /g, "-");
    console.log(req.query);
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
          //console.log(playerData);
          res.json(playerData);
        });
    }

    function playerSpecific(player) {
      msf
        .getData("nfl", season, "cumulative_player_stats", "json", {
          limit: "15",
          player: player,
          force: true
        })
        .then(function(response) {
          var playerData = response.cumulativeplayerstats.playerstatsentry;
          //console.log(playerData);
          res.json(playerData);
        });
    }

    if (playerName) {
      playerSpecific(playerName);
    } else {
      playerPull(season, position, stat);
    }
  });
};
