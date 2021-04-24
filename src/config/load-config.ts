const loadConfig = (configSchema: any, data: any) => {
  const { error, value: envVars } = configSchema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(`Environment's variable validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    application: {
      name: envVars.APPLICATION_NAME,
      version: envVars.APPLICATION_VERSION,
      mongoUri: envVars.MONGODB_URI,
    },
  };
};

export default loadConfig;
