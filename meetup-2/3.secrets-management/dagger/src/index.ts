import {
  argument,
  Container,
  dag,
  Directory,
  func,
  object,
  Service,
  Secret
} from "@dagger.io/dagger";

@object()
class Demo4 {
  @func()
  async deploy(
    @argument({ defaultPath: "/" }) source: Directory,
    token: Secret,
    prod: boolean
  ): Promise<string> {
    const pipelineContainer = dag
      .container()
      .from("denoland/deno:alpine")
      .withSecretVariable("DENO_DEPLOY_TOKEN", token)
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
      .withExec([
        "deployctl",
        "deploy",
        prod ? "--prod" : "",
        "--project",
        "meetup-dagger-staytuned",
        "--entrypoint",
        "main.ts",
      ]);

    return pipelineContainer.stdout();
  }
}
