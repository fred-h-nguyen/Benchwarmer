//required models and passport for api routes
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
var key = require("./key");
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true, null);
msf.authenticate(key.sportsDataAPI.apiKey, key.sportsDataAPI.code);

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

  // Create a new example
  app.post("/api/roster", function(req, res) {
    db.fbRoster.create(req.body).then(function(player) {
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
//This is a call for Quarter Backs
    msf
      .getData("nfl", "current", "cumulative_player_stats", "json", {
        sort: "player.lastname",
        limit: "15",
        position: "qb"
      })
      .then(function(response) {
        var playerData = response.cumulativeplayerstats.playerstatsentry;
        for (i = 0; i < playerData.length; i++) {
          console.log(
            "player_name: " +
              playerData[i].player.FirstName +
              " " +
              playerData[i].player.LastName +
              "\r\n" +
              "Position: " +
              playerData[i].player.Position +
              "\r\n" +
              "Games: " +
              playerData[i].stats.GamesPlayed["#text"] +
              "\r\n" +
              "Pass Yards: " +
              playerData[i].stats.PassYards["#text"] +
              "\r\n" +
              "Pass Attempts: " +
              playerData[i].stats.PassAttempts["#text"] +
              "\r\n" +
              "Pass Completions: " +
              playerData[i].stats.PassCompletions["#text"] +
              "\r\n" +
              "Pass Percentage: " +
              playerData[i].stats.PassPct["#text"] +
              "\r\n" +
              "QB Rating: " +
              playerData[i].stats.PassPct["#text"] +
              "\r\n"
            
          );
        }
      });

    res.status(201).end();
  });

  //get call for query where axios will make call based on user query
  app.get("/api/players", function(req, res) {
    //axios call here for the query
    //.then empty the div with player suggestions and now append searched players
    res.status(201).end();
  });
};
