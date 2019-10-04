module.exports = function(sequelize, Datatypes) {
  var fbRoster = sequelize.define("fbRoster", {
    PlayerName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    Position: {
      type: Datatypes.STRING,
      allowNull: false
    },
    GamesPlayed: Datatypes.STRING,
    PassYards: Datatypes.STRING,
    RushYards: Datatypes.STRING,
    Receptions: Datatypes.STRING,
    TackleSolo: Datatypes.STRING,
    Interceptions: Datatypes.STRING,
    ownerID: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  return fbRoster;
};
