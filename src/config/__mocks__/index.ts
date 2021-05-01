const config = () => ({
  env: 'test',
  port: 8082,
  application: {
    name: 'envVars.APPLICATION_NAME',
    version: 'envVars.APPLICATION_VERSION',
    mongoUri: 'envVars.MONGODB_URI',
  },
  services: {
    cep: {
      url: 'envVars.CEP_SERVICE',
      token: 'envVars.AUTHORIZATION_TOKEN',
    },
  },
});

export default config;
