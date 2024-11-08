import {
  dag,
  Directory,
  func,
  object,
} from "@dagger.io/dagger";

@object()
class Demo3 {
  @func()
  async deploy(
    @argument({ defaultPath: "/" }) source: Directory,
    // token: Secret,
  ): Promise<string> {
    const pipelineContainer = dag
      .container()
      .from("denoland/deno:alpine")
      // .withSecretVariable("DENO_DEPLOY_TOKEN", token)
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec([
        "deno",
        "install",
        "-Arf",
        "--global",
        "jsr:@deno/deployctl",
      ])
      .withExec(["deno", "fmt", "."])
      .terminal()
      // .withExec([
      //   "deployctl",
      //   "deploy",
      //   "--prod",
      //   "--project",
      //   "meetup-2-staytuned",
      //   "--entrypoint",
      //   "main.ts",
      // ]);

    return pipelineContainer.stdout();
  }
}
