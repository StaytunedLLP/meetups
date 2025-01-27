import { dag, Directory, func, object, Secret } from "@dagger.io/dagger";
@object()
class Ghademo {
  @func()
  async Gha_OnPush(): Promise<Directory> {
    return dag
      .gha()
      .withPipeline(
        "DevOps Package | gha",
        'build-and-push-image --dockerfile-path="devops.dockerfile" --context-dir="dockerfiles" --docker-password=env:DOCKER_PASSWORD --orgs="staytunedllp"',
        {
          onPushBranches: ["main"],
          secrets: ["DOCKER_PASSWORD"],
          module: "./dockerdemo",
        },
      )
      .config();
  }
}
