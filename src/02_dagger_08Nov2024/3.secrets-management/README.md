# Secrets Management

In this section, we will learn how to manage secrets in Dagger pipelines.

## Files

- `dagger/src/index.ts`: Contains the code for a Dagger pipeline that deploys a
  Deno project using a secret token.
- `dagger.json`: Configuration file for the Dagger project.
- `deploy.yml`: GitHub Actions workflow file to run the Dagger pipeline on push.
- `project-deno/`: Contains the Deno project to be deployed.

## Steps

1. Write the code for the pipeline to use a secret token.
2. Create a GitHub Actions workflow to run the pipeline on push.
3. Test the pipeline to ensure it works as expected.

## Commands

```bash
dagger functions -m meetup-2/3.secrets-management
```

```bash
dagger call -m meetup-2/3.secrets-management deploy --help
```

```bash
dagger call -m meetup-2/3.secrets-management deploy --prod=true --token=env:"DENO_DEPLOY_TOKEN" --source=meetup-2/3.secrets-management/project-deno
```

[Back to Meetup 2](../README.md)
