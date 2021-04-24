/* eslint-disable @typescript-eslint/no-unused-vars */
interface AppConfig {
  name: string;
  version: string;
}

interface LoggerConfig {
  name: string;
  level: string;
  logstash: {
    host?: string;
    port?: number;
  };
}

interface ServicesConfig {
  [key: string]: {
    url: string;
  };
}

interface Config {
  env: string;
  port: number;
  application: AppConfig;
  logger: LoggerConfig;
  services: ServicesConfig;
}
