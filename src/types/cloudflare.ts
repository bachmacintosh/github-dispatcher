/* eslint-disable @typescript-eslint/naming-convention --
   These are environment variables, and must be in SCREAMING_SNAKE_CASE
*/
export interface Env {
	GITHUB_TOKEN: string;
	DB: D1Database;
}

export interface WorkflowDispatch {
	id: number;
	run_hour: number;
	dispatch_id: number;
	owner: string;
	repo: string;
	ref: string;
	workflow_id: number;
}

export interface WorkflowDispatchInput {
	input_key: string;
	input_value: string;
}
