export interface AppConfig {
  name: string;
  version: string;
  clientId: string;
}
export interface DatabaseConfig {
  host: string;
  username: string;
  password: string;
  database: string;
  client: string;
  pool?: {
    max?: number;
    min?: number;
  };
}
export interface ServicesConfig {
  [key: string]: {
    url: string;
  };
}

export interface Config {
  env: string;
  port: number;
  application: AppConfig;
  database: DatabaseConfig;
  services?: ServicesConfig;
}
