import type { Endpoints } from "@octokit/types";
export type WorkflowDispatchParameters =
	Endpoints["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"]["parameters"];
