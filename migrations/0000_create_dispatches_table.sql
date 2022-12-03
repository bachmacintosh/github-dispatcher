-- Migration number: 0000 	 2022-12-03T00:38:54.799Z
DROP TABLE IF EXISTS github_dispatch_schedule;
DROP TABLE IF EXISTS github_dispatch_inputs;
DROP TABLE IF EXISTS github_dispatches;
CREATE TABLE github_dispatches (
	id INTEGER PRIMARY KEY,
	owner TEXT,
	repo TEXT,
	ref TEXT,
	workflow_id INTEGER
);