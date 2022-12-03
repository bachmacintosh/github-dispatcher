import type { Env, WorkflowDispatchParameters } from "../types";

export async function dispatchWorkflow(env: Env, parameters: WorkflowDispatchParameters): Promise<void> {
	const { owner, ref, repo, workflow_id } = parameters;
	const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
	const body: { ref: string; inputs?: Record<string, string> } = {
		ref,
	};
	if (typeof parameters.inputs !== "undefined") {
		body.inputs = parameters.inputs;
	}
	const headers = new Headers({
		Accept: "application/vnd.github+json",
		Authorization: `Bearer ${env.GITHUB_TOKEN}`,
		"User-Agent": "GitHub-Dispatcher-by-@bachmacintosh",
		"X-GitHub-Api-Version": "2022-11-28",
	});
	const init: RequestInit<RequestInitCfProperties> = {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	};
	const response = await fetch(url, init);
	if (!response.ok) {
		throw new Error(`GitHub HTTP Error ${response.status}`);
	}
}
