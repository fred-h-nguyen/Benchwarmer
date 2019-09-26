USE benchwarmer_db;
INSERT INTO owners (owner_name, login_code, email, team_name)
	VALUES ('Marcus Allen', '1234568', 'mallen@raiders.com', 'Raiders');
INSERT INTO football_roster (player_name, position, position_type, games_played, passing_yards, rushing_yards, tackles, touchdowns, interceptions, sacks, field_goals, ownerID)
	VALUES ('Howie Long', 'Defensive Tackle', 'Defense', 1000, 0, 55, 1200, 120, 25, 75, 0, LAST_INSERT_ID());
    
INSERT INTO owners (owner_name, login_code, email, team_name)
	VALUES ('Jerry Rice', '1234568', 'jrice@49ers.com', '49ers');
INSERT INTO football_roster (player_name, position, position_type, games_played, passing_yards, rushing_yards, tackles, touchdowns, interceptions, sacks, field_goals, ownerID)
	VALUES ('Joe Montanna', 'Quarterback', 'Offense', 1000, 12000, 55, 1200, 120, 25, 75, 0, LAST_INSERT_ID());
    
INSERT INTO owners (owner_name, login_code, email, team_name)
	VALUES ('Joe Green', '1234568', 'meanjoe@Steelers.com', 'Steelers');
INSERT INTO football_roster (player_name, position, position_type, games_played, passing_yards, rushing_yards, tackles, touchdowns, interceptions, sacks, field_goals, ownerID)
	VALUES ('Terry Bradshaw', 'Quarterback', 'Offense', 1000, 12000, 55, 1200, 1200, 250, 75, 0, LAST_INSERT_ID());
    
    