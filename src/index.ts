/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import requestId from 'express-request-id';
import swaggerUi from 'swagger-ui-express';
import * as openApiValidator from 'express-openapi-validator';
import path from 'path';
import appConfig from './config';
import router from './router';
import errorHandler from './middlewares/error-handler';
import swaggerDocument from '../swagger/spec.json';
import MongoHelper from './helpers/mongodb/mongodb';

export const app = express();

app.set('json spaces', 2);

app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const config = appConfig();
app.locals.config = config;

app.use(requestId());
app.use(openApiValidator.middleware({
  apiSpec: path.join(__dirname, '/../swagger/spec.json'),
  validateResponses: true,
}));
app.use(router);
app.use(errorHandler);

export function start(port: number | string, mongoUri: string): Promise<void> {
  return new Promise<void>((resolve) => {
    MongoHelper.connect(mongoUri)
      .then(async () => {
        app.listen(port, () => resolve(console.log(`Server running at http://localhost:${port}`)));
      })
      .catch(console.error);
  });
}
