/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import * as server from './src';
import appConfig from './src/config';

dotenv.config();
const config = appConfig();
const { port, application: { mongoUri } } = config;

server.start(port, mongoUri);

process.on('uncaughtException', (err) => {
  console.error('uncaughtException >>>> ', err);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection >>>> ', err);
});
