module.exports = function(sequelize, Datatypes) {
  var fbRoster = sequelize.define("fbRoster", {
    playerName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    position: {
      type: Datatypes.STRING,
      allowNull: false
    },
    positionType: {
      type: Datatypes.STRING,
      allowNull: false
    },
    gamesPlayed: Datatypes.INTEGER,
    rushingYDS: Datatypes.INTEGER,
    passingYDS: Datatypes.INTEGER,
    tackles: Datatypes.INTEGER,
    touchdowns: Datatypes.INTEGER,
    interceptions: Datatypes.INTEGER,
    sacks: Datatypes.INTEGER,
    fieldGoals: Datatypes.INTEGER,
    ownerID: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  return fbRoster;
};
