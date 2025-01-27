import {
  Container,
  dag,
  Directory,
  func,
  object,
  Secret,
} from "@dagger.io/dagger";

@object()
class Dockerdemo {
  /**
   * Build and push image to GHCR
   * @param dockerfilePath
   * @param contextDir
   * @param dockerPassword
   * @param orgs space seperated list of organisation
   */
  @func()
  async buildAndPushImage(
    dockerfilePath: string,
    contextDir: Directory,
    dockerPassword: Secret,
    orgs: string,
  ): Promise<void> {
    const registry = "ghcr.io";
    for (const org of orgs.split(" ")) {
      const imageName = org.toLocaleLowerCase() + "/sample";
      const container = dag.container()
        .withDirectory("/src", contextDir)
        .directory("/src")
        .dockerBuild({ dockerfile: dockerfilePath });

      await container.withRegistryAuth(
        registry,
        org,
        dockerPassword,
      )
        .publish(registry + "/" + imageName);
    }
  }
}
