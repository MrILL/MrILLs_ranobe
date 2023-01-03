migration_generate:
	yarn migration:generate ./src/migrations/$(name)

migration_run:
	yarn migration:run
