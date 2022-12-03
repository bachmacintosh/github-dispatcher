INSERT INTO github_dispatches (
	id, owner, repo, ref, workflow_id
) VALUES (
	1, "bachmacintosh", "new.bachmacintosh.com", "main", 41966281
);
INSERT INTO github_dispatch_schedule (
	id, run_hour, dispatch_id
) VALUES (
	1, 0, 1
), (
	2, 16, 1
);