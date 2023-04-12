## on commence par s'identifier en tant que superAdmin postgres
export PGUSER=postgres
export PGHOST=localhost

## On supprime la bdd et l'utilisateur propriétaire
dropdb kanban
dropuser kanban_admin

## on crée la base de donnée et son utilisateur associé
psql -f create_db.sql -d postgres
psql -f create_tables.sql -d kanban -U kanban_admin
