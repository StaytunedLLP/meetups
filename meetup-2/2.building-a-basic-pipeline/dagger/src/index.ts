import {
  argument,
  Container,
  dag,
  Directory,
  func,
  object,
  Service,
} from "@dagger.io/dagger";

@object()
class Demo2 {
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
  // TODO: Exercise: Create a similar function to perform linting using dagger and then print the output
  // command: `deno lint .`
  //   @func()
  //   async lint(): Promise<string> {}
}
