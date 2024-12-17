DB_NAME=chess_database
DB_USER=admin
DB_PASSWORD=adminPass

# Default target to bring up all services
up: 
	@echo "Starting up all services..."
	docker-compose up

# Target to initialize the database (if necessary)
init-db:
	docker-compose up -d db

# Target to bring down all services
down: 
	@echo "Stopping and removing all services..."
	docker-compose down

# Target to truncate all tables in the database
reset-tables:
	@echo "Truncating all tables in the database..."
	docker-compose exec db psql -U $(DB_USER) -d $(DB_NAME) -c "\
	SET session_replication_role = replica; \
	TRUNCATE TABLE event_team_user_role CASCADE; \
	TRUNCATE TABLE puzzles CASCADE; \
	TRUNCATE TABLE team CASCADE; \
	TRUNCATE TABLE events CASCADE; \
	TRUNCATE TABLE users CASCADE; \
	TRUNCATE TABLE roles CASCADE; \
	SET session_replication_role = DEFAULT;"

# Target to drop all tables in the database
drop-tables:
	@echo "Dropping all tables in the database..."
	docker-compose exec db psql -U $(DB_USER) -d $(DB_NAME) -c "\
	DROP TABLE IF EXISTS event_team_user_role CASCADE; \
	DROP TABLE IF EXISTS puzzles CASCADE; \
	DROP TABLE IF EXISTS events CASCADE; \
	DROP TABLE IF EXISTS users CASCADE; \
	DROP TABLE IF EXISTS roles CASCADE;"

# Target to reset the database by dropping all tables
reset-db: drop-tables  # Drop all tables to reset the database
	@echo "Database reset completed."
