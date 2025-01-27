import {
  argument,
  Container,
  dag,
  Directory,
  func,
  object,
  Secret,
} from "@dagger.io/dagger";

@object()
class Nodedemo {
  /**
   * Install dependencies, run tests, and build the project
   */
  @func()
  async runPipeline(source: Directory): Promise<Container> {
    // create a Dagger cache volume for dependencies
    const nodeCache = dag.cacheVolume("node");

    // create a container to run the pipeline
    const pipelineContainer = dag
      .container()
      // start from a base Node.js container
      .from("node:21-slim")
      // add the source code at /src
      .withDirectory("/src", source)
      // mount the cache volume at /src/node_modules
      .withMountedCache("/src/node_modules", nodeCache)
      // change the working directory to /src
      .withWorkdir("/src")
      // run npm install to install dependencies
      .withExec(["npm", "install"])
      // run npm test to execute tests
      .withExec(["npm", "test"])
      // run npm build to build the project
      .withExec(["npm", "run", "build"])
      .withExec(["node", "dist/src/hello.js"]);

    console.log("Out", await pipelineContainer.stdout());
    console.log("Err", await pipelineContainer.stderr());
    return pipelineContainer;
  }

  @func()
  async runDeno(
    @argument({ defaultPath: "/nodedemo/project-deno" }) source: Directory,
  ): Promise<string> {
    const pipelineContainer = dag
      .container()
      // start from a base Node.js container
      .from("denoland/deno:alpine")
      // add the source code at /src
      .withDirectory("/src", source)
      // change the working directory to /src
      .withWorkdir("/src")
      // run npm install to install dependencies
      .withExec(["deno", "fmt", "test.ts"])
      .withExec(["deno", "run", "test.ts"]);
    // run npm test to execute tests
    console.log("Out", await pipelineContainer.stdout());
    console.log("Err", await pipelineContainer.stderr());

    return pipelineContainer.stdout();
  }

  @func()
  async runDeployctl(
    @argument({ defaultPath: "/nodedemo/project-deno" }) source: Directory,
    token: Secret,
  ): Promise<string> {
    const pipelineContainer = dag
      .container()
      // start from a base Node.js container
      .from("denoland/deno:alpine")
      .withSecretVariable("DENO_DEPLOY_TOKEN", token)
      // add the source code at /src
      .withDirectory("/src", source)
      // change the working directory to /src
      .withWorkdir("/src")
      // install deployctl
      .withExec([
        "deno",
        "install",
        "-Arf",
        "--global",
        "jsr:@deno/deployctl",
      ])
      // run deno fmt to format the code
      .withExec(["deno", "fmt", "test.ts"])
      // run the main script
      .withExec(["deno", "run", "test.ts"])
      .terminal()
      // run a command from the dagger module
      .withExec([
        "deployctl",
        "deploy",
        "--prod",
        "--project",
        "meetup-1",
        "--org",
        "StaytunedLLP",
        "--entrypoint",
        "main.ts",
      ]);

    // log the output and errors
    console.log("Out", await pipelineContainer.stdout());
    console.log("Err", await pipelineContainer.stderr());

    return pipelineContainer.stdout();
  }
}
