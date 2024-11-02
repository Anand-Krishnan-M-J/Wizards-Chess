-- Insert mock data into the puzzles table
INSERT INTO puzzles (puzzle_state) 
VALUES 
    ('{"level": 1, "status": "incomplete", "time_elapsed": "00:05:30"}'),
    ('{"level": 2, "status": "complete", "time_elapsed": "00:07:45"}'),
    ('{"level": 3, "status": "incomplete", "time_elapsed": "00:03:15"}'),
    ('{"level": 4, "status": "complete", "time_elapsed": "00:10:22"}'),
    ('{"level": 5, "status": "incomplete", "time_elapsed": "00:08:12"}'),
    ('{"level": 6, "status": "incomplete", "time_elapsed": "00:06:18"}'),
    ('{"level": 7, "status": "complete", "time_elapsed": "00:04:50"}'),
    ('{"level": 8, "status": "incomplete", "time_elapsed": "00:07:40"}'),
    ('{"level": 9, "status": "complete", "time_elapsed": "00:09:30"}'),
    ('{"level": 10, "status": "incomplete", "time_elapsed": "00:12:05"}');

-- Insert mock data into the users table
INSERT INTO users (user_name, email_id, password, puzzle_level, matches_won, events_won, score)
VALUES 
    ('Alice Johnson', 'alice@example.com', 'hashed_password_1', 1, 3, 1, 150),
    ('Bob Smith', 'bob@example.com', 'hashed_password_2', 2, 5, 2, 250),
    ('Carol King', 'carol@example.com', 'hashed_password_3', 3, 2, 0, 100),
    ('David Brown', 'david@example.com', 'hashed_password_4', 4, 6, 3, 300),
    ('Eve White', 'eve@example.com', 'hashed_password_5', 5, 7, 4, 350),
    ('Frank Black', 'frank@example.com', 'hashed_password_6', 6, 8, 2, 400),
    ('Grace Lee', 'grace@example.com', 'hashed_password_7', 7, 4, 1, 200),
    ('Henry Adams', 'henry@example.com', 'hashed_password_8', 8, 9, 3, 450),
    ('Ivy Green', 'ivy@example.com', 'hashed_password_9', 9, 3, 2, 180),
    ('Jack Hill', 'jack@example.com', 'hashed_password_10', 10, 10, 5, 500);

-- Insert mock data into the events table
INSERT INTO events (event_name, event_description)
VALUES 
    ('Puzzle Championship', 'Annual puzzle-solving championship event'),
    ('Speed Puzzle Challenge', 'Challenge to solve puzzles in the least amount of time'),
    ('Team Puzzle Battle', 'Battle of puzzle-solving skills among teams'),
    ('Global Puzzle Day', 'A day dedicated to solving puzzles across the globe'),
    ('Puzzle Marathon', 'Endurance puzzle-solving event spanning multiple hours');

-- Insert mock data into the teams table
INSERT INTO teams (team_name, event_id)
VALUES 
    ('Team Alpha', 1),
    ('Team Beta', 1),
    ('Team Gamma', 2),
    ('Team Delta', 2),
    ('Team Epsilon', 3),
    ('Team Zeta', 3),
    ('Team Eta', 4),
    ('Team Theta', 4),
    ('Team Iota', 5),
    ('Team Kappa', 5);

-- Insert mock data into the roles table
INSERT INTO roles (role_name)
VALUES 
    ('organizer'),
    ('player');

-- Insert mock data into the event_team_user_role table
INSERT INTO event_team_user_role (event_id, user_id, role_id, team_id)
VALUES 
    (1, 1, 1, 1),  -- Alice as organizer in Team Alpha for event 1
    (1, 2, 2, 1),  -- Bob as player in Team Alpha for event 1
    (2, 3, 1, 3),  -- Carol as organizer in Team Gamma for event 2
    (2, 4, 2, 3),  -- David as player in Team Gamma for event 2
    (3, 5, 1, 5),  -- Eve as organizer in Team Epsilon for event 3
    (3, 6, 2, 5),  -- Frank as player in Team Epsilon for event 3
    (4, 7, 1, 7),  -- Grace as organizer in Team Eta for event 4
    (4, 8, 2, 7),  -- Henry as player in Team Eta for event 4
    (5, 9, 1, 9),  -- Ivy as organizer in Team Iota for event 5
    (5, 10, 2, 9); -- Jack as player in Team Iota for event 5
