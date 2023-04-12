-- creating role to manage DB
CREATE USER kanban_admin WITH LOGIN PASSWORD 'kanban';

-- Creating DB
CREATE DATABASE kanban OWNER kanban_admin;