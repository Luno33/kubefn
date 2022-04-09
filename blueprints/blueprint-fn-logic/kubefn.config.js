module.exports = {
  config: {
    port: 3000,
    imageregistry: "registry.gitlab.com",
    imageregistrypath: "registry.gitlab.com/luno721/allstampsbackend",
    imagepullsecret: "docker-repo-credential",
    replicas: "2"
  }
}
