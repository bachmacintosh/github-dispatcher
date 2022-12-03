# github-dispatcher

A Cloudflare Worker that runs GitHub Actions on a schedule.

## Requirements

- A Cloudflare account with a D1 Database
- A GitHub Fine-Grained Personal Access Token

## Install

Clone repo and install dependencies:

```shell
npm install
```

Make sure you're logged into Wrangler.

```shell
npx wrangler whoami
```

Create a Cloudflare D1 database if not done already

```shell
npx wrangler d1 create <DATABASE_NAME>
```

Update the `db:migrate` and `db:seed` scripts in `package.json` to reflect your own database name, as well as the database ID in `wrangler.toml`.

Apply the migrations.

```shell
npm run db:migrate
```

Update `./seeds/example.sql` with your own GitHub owner, repo, ref (branch or tag), and workflow ID; set the schedule to your desired run times for each dispatch, and optionally specify any needed inputs. You can get a list of workflow IDs from a public repo by visiting:

```
https://api.github.com/repos/<OWNER>/<REPO>/actions/workflows
```

(For private repos, you will need to authenticate using the fine-grained personal access token.)

Here's an example:

```sql
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
INSERT INTO github_dispatch_inputs (
  id, dispatch_id, input_key, input_value
) VALUES (
  1, 1, "example-key-1", "Example Value 1"
), (
  2, 1, "example-key-2", "Example Value 2"
);
```

Once that's done, seed the database.

```shell
npm run db:seed
```

Publish the worker.

```shell
npm run publish
```

Add your fine-grained personal access token as an environment variable.

```shell
npx wrangler secret put GITHUB_TOKEN
```
