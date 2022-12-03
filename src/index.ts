import type { Env } from "./types";
import { handleScheduled } from "./functions/cloudflare";

export default {
	scheduled(event: ScheduledEvent, env: Env, context: ExecutionContext): void {
		context.waitUntil(handleScheduled(env));
	},
};
