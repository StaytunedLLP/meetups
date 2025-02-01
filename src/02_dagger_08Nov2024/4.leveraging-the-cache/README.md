# Leveraging the Cache

In this section, we will learn how to leverage caching in Dagger pipelines.

## Files

- `dagger/src/index.ts`: Contains the code for a Dagger pipeline that leverages
  caching.
- `dagger.json`: Configuration file for the Dagger project.

## Steps

1. Write the code for the pipeline to use caching.
2. Test the pipeline to ensure it works as expected.

## Commands

```bash
dagger functions -m src/02_dagger_08Nov2024/4.leveraging-the-cache
```

```bash
dagger call -m src/02_dagger_08Nov2024/4.leveraging-the-cache format --help
```

```bash
dagger call -m src/02_dagger_08Nov2024/4.leveraging-the-cache format
```

```bash
dagger query <<EOF
{
  daggerEngine {
    localCache {
      entrySet {
        entries {
          description
          diskSpaceBytes
        }
      }
    }
  }
}
EOF
```

```bash
dagger call -m src/02_dagger_08Nov2024/4.leveraging-the-cache format
```

[Back to Meetup 2](../README.md)
