# Setting Up Your Environment

In this section, we will set up the environment required for running Dagger
pipelines.

## Files

- `dagger/src/index.ts`: Contains the code for a simple Dagger pipeline that
  echoes a string using an Alpine container.
- `dagger.json`: Configuration file for the Dagger project.

## Steps

1. Install the necessary dependencies.
2. Run the Dagger pipeline to ensure everything is set up correctly.

## Links

- [Docker](https://docs.docker.com/engine/install/)
- [Dagger](https://docs.dagger.io/install/)

## Commands

```bash
dagger functions -m meetup-2/1.setting-up-your-enviroment
```

```bash
dagger call -m meetup-2/1.setting-up-your-enviroment container-echo --help
```

```bash
dagger call -m meetup-2/1.setting-up-your-enviroment container-echo --string-arg="hello-world"
```

[Back to Meetup 2](../README.md)
