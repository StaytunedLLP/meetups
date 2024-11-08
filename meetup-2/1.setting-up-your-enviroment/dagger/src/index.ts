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
class Demo1 {
  @func()
  containerEcho(stringArg: string): string {
    const result = dag.container().from("alpine:latest").withExec([
      "echo",
      stringArg as string,
    ]);

    return result.stdout();
  }
}
