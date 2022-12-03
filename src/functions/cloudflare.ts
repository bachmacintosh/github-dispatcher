import type { Env, WorkflowDispatch, WorkflowDispatchInput, WorkflowDispatchParameters } from "../types";
import { dispatchWorkflow } from "./github";

export async function handleScheduled(env: Env): Promise<void> {
	const dateOptions: Intl.DateTimeFormatOptions = {
		timeZone: "America/New_York",
	};
	const date = new Date().toLocaleString("en-US", dateOptions);
	const runHour = new Date(date).getHours();
	const stmt = env.DB.prepare(
		`SELECT a.id, a.run_hour, a.dispatch_id, b.owner, b.repo, b.ref, b.workflow_id ` +
			`FROM github_dispatch_schedule a ` +
			`INNER JOIN github_dispatches b ON a.dispatch_id = b.id ` +
			`WHERE run_hour = ?1`,
	).bind(runHour);
	const query: D1Result<WorkflowDispatch> = await stmt.all();
	if (typeof query.error !== "undefined") {
		throw new Error(query.error);
	}
	if (typeof query.results !== "undefined" && query.results.length > 0) {
		await Promise.all(
			query.results.map(async (result) => {
				const { dispatch_id, owner, repo, ref, workflow_id } = result;
				const params: WorkflowDispatchParameters = {
					owner,
					ref,
					repo,
					workflow_id,
				};
				const inputStmt = env.DB.prepare(
					`SELECT input_key, input_value FROM github_dispatch_inputs WHERE dispatch_id = ?1`,
				).bind(dispatch_id);
				const inputQuery: D1Result<WorkflowDispatchInput> = await inputStmt.all();
				if (typeof inputQuery.error !== "undefined") {
					throw new Error(inputQuery.error);
				}
				if (typeof inputQuery.results !== "undefined" && inputQuery.results.length > 0) {
					inputQuery.results.forEach((input) => {
						if (typeof params.inputs === "undefined") {
							params.inputs = {};
						}
						params.inputs[input.input_key] = input.input_value;
					});
				}
				await dispatchWorkflow(env, params);
			}),
		);
	}
}
