-- Migration number: 0002 	 2022-12-03T00:45:17.364Z
CREATE TABLE github_dispatch_inputs (
	id INTEGER PRIMARY KEY,
	dispatch_id INTEGER,
	input_key TEXT,
	input_value TEXT,
	FOREIGN KEY (dispatch_id) REFERENCES github_dispatches(id)
);