-- Create a puzzles table to store puzzle states
CREATE TABLE IF NOT EXISTS puzzles (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each puzzle
    puzzle_state JSON NOT NULL               -- Represents the state(JSON object) of the puzzle
);

-- Create a users table to store user information
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each user
    user_name VARCHAR(100) NOT NULL,         -- User's display name
    email_id VARCHAR(255) NOT NULL UNIQUE,   -- User's email address (for authentication)
    password VARCHAR(255),                   -- User's hashed password
    avatar VARCHAR(255),                     -- User's Avatar
    puzzle_level INT,                        -- User's current puzzle level
    matches_won INT DEFAULT 0,               -- Total matches won by the user
    events_won INT DEFAULT 0,                -- Total events won by the user
    score INT DEFAULT 0,                     -- Total score based on matches and events won by the user
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      -- Timestamp for when the user was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP       -- Timestamp for last update
);

-- Add trigger to update 'updated_at' column on modification
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create an events table to store event details
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each event
    event_name VARCHAR(100) NOT NULL,        -- Name of the event
    event_description TEXT,                  -- Description of the event (HTML)
    game_type VARCHAR(100) NOT NULL,                          -- swiss | roundRobin | elimination
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- End date for the event
);

-- Create a teams table to store teams associated with events
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each team
    team_name VARCHAR(100) NOT NULL,         -- Name of the team
    event_id INT NOT NULL,                   -- Reference to the associated event
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE  -- Foreign key constraint with cascade delete
);

-- Create a roles table to define different roles for users
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each role
    role_name VARCHAR(100) NOT NULL          -- Name of the role (e.g., organizer, player, superAdmin)
);

-- Create an event_team_user_role table to manage user roles in events
CREATE TABLE IF NOT EXISTS event_team_user_role (
    id SERIAL PRIMARY KEY,                   -- Unique identifier for each entry
    event_id INT NOT NULL,                   -- Reference to the event
    user_id INT NOT NULL,                    -- Reference to the user
    role_id INT NOT NULL,                    -- Reference to the user role
    team_id INT,                             -- Reference to the team (optional for one-on-one matches)
    allow_edit BOOLEAN,                      -- Organizers can allow/disallow team leaders to edit
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,     -- Foreign key with cascade delete for event
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,       -- Foreign key with cascade delete for user
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,       -- Foreign key with cascade delete for role
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL       -- Foreign key for team, set to NULL on delete
);
