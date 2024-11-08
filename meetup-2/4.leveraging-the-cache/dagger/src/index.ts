import {
  dag,
  Directory,
  func,
  object,
} from "@dagger.io/dagger";

@object()
class Demo3 {
  @func()
  async format(
    @argument({ defaultPath: "/" }) source: Directory,
  ): Promise<string> {
    const pipelineContainer = dag
      .container()
      .from("denoland/deno:alpine")
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec(["deno", "fmt", "."]);

    return pipelineContainer.stdout();
  }
}
