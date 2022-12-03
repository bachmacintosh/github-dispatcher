-- Migration number: 0001 	 2022-12-03T00:42:23.561Z
CREATE TABLE github_dispatch_schedule (
	id INTEGER PRIMARY KEY,
	run_hour INTEGER,
	dispatch_id INTEGER,
	FOREIGN KEY (dispatch_id) REFERENCES github_dispatches(id)
);