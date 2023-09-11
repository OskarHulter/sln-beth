# List all the actions in your YAML file
act -l

# List actions for a specific event (here the event is push)
act push -l

# Get Act to run the workflow as if a specific push to master event occured
act push

# Get Act to run a specific job
act -j test

# pass secrets into a job so that the GitHub action can consume them
act -s MY_TOKEN_SECRET=<token> -s MY_NETLIFY_SITE_ID=<site_id> 

# run a GitHub action that uses artifacts between jobs
act --artifact-server-path /tmp/artifacts push