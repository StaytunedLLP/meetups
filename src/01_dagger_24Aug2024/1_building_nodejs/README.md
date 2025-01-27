# Build Node.js Application

This section describes the steps to build a Node.js application using Dagger.

```mermaid
graph TD
    A[Start] --> B[Create Dagger cache volume for dependencies]
    B --> C[Create a container to run the pipeline]
    C --> D[Start from a base Node.js container]
    D --> E[Add the source code at /src]
    E --> F[Mount the cache volume at /src/node_modules]
    F --> G[Change the working directory to /src]
    G --> H[Run npm install to install dependencies]
    H --> I[Run npm test to execute tests]
    I --> J[Run npm run build to build the project]
    J --> K[Return pipeline container]
    K --> L[End]
```

To run the pipeline locally, execute the following command from the `1_building_nodejs`
folder:

```sh
dagger call run-pipeline --source="project"
```
