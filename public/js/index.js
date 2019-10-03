$(document).ready(function() {
  var tbody = $("#suggestTable");
  function renderTable(data) {
    for (var i = 0; i < data.length; i++) {
      var player = data[i].player;
      var stat = data[i].stats;
      var tr = $("<tr>");
      var name = $("<td>");
      var position = $("<td>");
      var games = $("<td>");
      var passYds = $("<td>");
      var rushYds = $("<td>");
      var receptions = $("<td>");
      var tackleSolo = $("<td>");
      var interceptions = $("<td>");
      var add = $("<td>");
      var btn = $("<button>");
      btn.addClass("add btn");
      btn.attr({
        "data-player": player.FirstName + " " + player.LastName,
        "data-position": player.Position,
        "data-games": stat.GamesPlayed["#text"]
      });
      name.html(player.FirstName + " " + player.LastName);
      position.html(player.Position);
      games.html(stat.GamesPlayed["#text"]);
      if (stat.PassYards) {
        passYds.html(stat.PassYards["#text"]);
        btn.attr({ "data-passYds": stat.PassYards["#text"] });
      } else {
        passYds.html("0");
        btn.attr({ "data-passYds": "0" });
      }
      if (stat.RushYards) {
        rushYds.html(stat.RushYards["#text"]);
        btn.attr({ "data-rushYds": stat.RushYards["#text"] });
      } else {
        rushYds.html("0");
        btn.attr({ "data-rushYds": "0" });
      }
      if (stat.Receptions) {
        receptions.html(stat.Receptions["#text"]);
        btn.attr({ "data-receptions": stat.Receptions["#text"] });
      } else {
        receptions.html("0");
        btn.attr({ "data-receptions": "0" });
      }
      if (stat.TackleSolo) {
        tackleSolo.html(stat.TackleSolo["#text"]);
        btn.attr({ "data-tackles": stat.TackleSolo["#text"] });
      } else {
        tackleSolo.html("0");
        btn.attr({ "data-tackles": "0" });
      }
      if (stat.Interceptions) {
        interceptions.html(stat.Interceptions["#text"]);
        btn.attr({ "data-interceptions": stat.Interceptions["#text"] });
      } else {
        interceptions.html("0");
        btn.attr({ "data-interceptions": "0" });
      }
      btn.html("Add");
      add.append(btn);
      tr.append(
        name,
        position,
        games,
        passYds,
        rushYds,
        receptions,
        tackleSolo,
        interceptions,
        add
      );
      tbody.append(tr);
    }
  }

  $.ajax({ url: "/api/rostersuggestion", method: "GET" }).then(function(data) {
    console.log(data);
    renderTable(data);
  });
});
