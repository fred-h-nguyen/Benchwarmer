/*
OWNERS TABLE:
    -ID (AUTO INCREMENT)
    -USER NAME
    -PASSWORD
    -EMAIL
    -TEAM_NAME

*/

/*
FANTASY ROSTER:
    -ID (AUTO INCREMENT)
    -PLAYER_NAME
    -POSITION
    -JERSEY
    -USER_ID(KEY)
*/

DROP DATABASE IF EXISTS benchwarmer_db;
CREATE DATABASE benchwarmer_db;
USE benchwarmer_db;
CREATE TABLE owners
(
    ownerID INT NOT NULL AUTO_INCREMENT,
    owner_name VARCHAR (20) NOT NULL,
	login_code VARCHAR (8) NOT NULL,
    email VARCHAR (32) NOT NULL,
    team_name VARCHAR (100) NOT NULL,
		PRIMARY KEY (ownerID)
);

CREATE TABLE football_roster
(
	rosterID INT NOT NULL AUTO_INCREMENT,
    player_name VARCHAR (50),
    position VARCHAR (20),
    position_type VARCHAR (20),
    games_played INT (5),
    passing_yards INT (6),
    rushing_yards INT (6),
    tackles INT (6),
    touchdowns INT (6),
    interceptions INT (6),
    sacks INT (6),
    field_goals INT (6),
    ownerID INT NOT NULL,
		PRIMARY KEY (rosterID),
        FOREIGN KEY (ownerID) REFERENCES owners(ownerID)
);
