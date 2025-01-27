# Build and publish dockerfile to GHCR

This section describes the steps to build and publish a Docker image to the
GitHub Container Registry.

```mermaid
graph TD
    A[Start] --> B[Initialize registry variable to ghcr.io]
    B --> C[Split orgs string by space]
    C --> D[For each org in orgs]
    D --> E[Create a container with the context directory mounted at /src]
    E --> F[Build the container using the specified Dockerfile]
    F --> G[Authenticate with the registry using the org and dockerPassword]
    G --> H[Publish the container to the registry with the imageName]
    H --> I[End]
```

To build and push the Docker image locally, execute the following command from
the `2_build_publish_dockerfile_to_GHCR/dockerdemo` folder:

```sh
dagger call build-and-push-image --dockerfile-path="devops.dockerfile" --context-dir="../dockerfiles" --docker-password=env:DOCKER_PASSWORD --orgs="staytunedllp"
```
