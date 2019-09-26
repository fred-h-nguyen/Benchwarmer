USE benchwarmer_db;

SELECT * FROM football_roster
INNER JOIN owners ON owners.ownerID = football_roster.ownerID;

