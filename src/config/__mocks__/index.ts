const config = () => ({
  env: 'test',
  port: 8082,
  application: {
    name: 'envVars.APPLICATION_NAME',
    version: 'envVars.APPLICATION_VERSION',
  },
});

export default config;
