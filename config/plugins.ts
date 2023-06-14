export default ({ env }) => ({
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      minify: false,
      soft: true,
      importOnBootstrap: false,
      customTypes: [],
      excludedTypes: [],
      excludedConfig: ["core-store.plugin_users-permissions_grant"],
    },
  },
  graphql: {
    enable: true,
    config: {
      playgroundAlways: true,
      apolloServer: {
        introspection: true,
      },
    },
  },
});
