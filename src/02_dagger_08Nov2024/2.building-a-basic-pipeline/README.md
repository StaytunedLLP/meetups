# Building a Basic Pipeline

In this section, we will build a basic pipeline using Dagger.

## Files

- `dagger/src/index.ts`: Contains the code for a Dagger pipeline that formats
  code using Deno.
- `dagger.json`: Configuration file for the Dagger project.
- `fmt.yml`: GitHub Actions workflow file to run the Dagger pipeline on push.

## Steps

1. Write the code for the pipeline.
2. Create a GitHub Actions workflow to run the pipeline on push.
3. Test the pipeline to ensure it works as expected.

## Commands

```bash
dagger functions -m meetup-2/2.building-a-basic-pipeline
```

```bash
dagger call -m meetup-2/2.building-a-basic-pipeline format --help
```

```bash
dagger call -m meetup-2/2.building-a-basic-pipeline format --help
```

[Back to Meetup 2](../README.md)
