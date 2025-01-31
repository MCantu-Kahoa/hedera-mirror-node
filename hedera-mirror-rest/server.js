/*-
 * ‌
 * Hedera Mirror Node
 * ​
 * Copyright (C) 2019 - 2022 Hedera Hashgraph, LLC
 * ​
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ‍
 */

'use strict';

// external libraries
import express from 'express';
import {createTerminus} from '@godaddy/terminus';
import {addAsync} from '@awaitjs/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import httpContext from 'express-http-context';
import log4js from 'log4js';
import compression from 'compression';
import fs from 'fs';

// local files
import {router as v1Router} from './routes/v1/index.js';
import {getConfig as config} from './config.js';
import * as constants from './utils/constants.js';
import * as health from './health.js';
import {getPoolClass, isTestEnv, loadPgRange} from './utils/utils.js';
import {handleError} from './middleware/httpErrorHandler.js';
import {metricsHandler, recordIpAndEndpoint} from './middleware/metricsHandler.js';
import {serveSwaggerDocs, openApiValidator} from './middleware/openapiHandler.js';
import {responseHandler} from './middleware/responseHandler.js';
import {requestLogger, requestQueryParser} from './middleware/requestHandler.js';
import {StateproofController} from './controllers/index.js';
// Logger
const logger = log4js.getLogger();
log4js.configure({
  appenders: {
    console: {
      layout: {
        pattern: '%d{yyyy-MM-ddThh:mm:ss.SSSO} %p %x{requestId} %m',
        type: 'pattern',
        tokens: {
          requestId: (e) => httpContext.get(constants.requestIdLabel) || 'Startup',
        },
      },
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: config().log.level,
    },
  },
});
global.logger = log4js.getLogger();

// use a dummy port for jest unit tests
const port = isTestEnv() ? 3000 : config().port;
if (port === undefined || Number.isNaN(Number(port))) {
  logger.error('Server started with unknown port');
  process.exit(1);
}

// Postgres pool
const poolConfig = {
  user: config().db.username,
  host: config().db.host,
  database: config().db.name,
  password: config().db.password,
  port: config().db.port,
  connectionTimeoutMillis: config().db.pool.connectionTimeout,
  max: config().db.pool.maxConnections,
  statement_timeout: config().db.pool.statementTimeout,
};

if (config().db.tls.enabled) {
  poolConfig.ssl = {
    ca: fs.readFileSync(config().db.tls.ca).toString(),
    cert: fs.readFileSync(config().db.tls.cert).toString(),
    key: fs.readFileSync(config().db.tls.key).toString(),
    rejectUnauthorized: false,
  };
}
console.log(poolConfig);

const Pool = getPoolClass(isTestEnv());
loadPgRange();
const pool = new Pool(poolConfig);
global.pool = pool;

console.log(JSON.stringify(pool));

// Express configuration. Prior to v0.5 all sets should be configured before use or they won't be picked up
const app = addAsync(express());
const apiPrefix = '/api/v1';

app.disable('x-powered-by');
app.set('trust proxy', true);
app.set('port', port);
app.set('query parser', requestQueryParser);

serveSwaggerDocs(app);
if (isTestEnv()) {
  openApiValidator(app);
}

// middleware functions, Prior to v0.5 define after sets
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

if (config().response.compression) {
  logger.info('Response compression is enabled');
  app.use(compression());
}

// logging middleware
app.use(httpContext.middleware);
app.useAsync(requestLogger);

// metrics middleware
if (config().metrics.enabled) {
  app.use(metricsHandler());
}

// stateproof route
if (config().stateproof.enabled || isTestEnv()) {
  logger.info('stateproof REST API is enabled, install handler');
  app.getAsync(`${apiPrefix}/transactions/:transactionId/stateproof`, StateproofController.getStateProofForTransaction);
} else {
  logger.info('stateproof REST API is disabled');
}

// Application Routes
app.use(`${apiPrefix}`, v1Router);

// record ip metrics if enabled
if (config().metrics.ipMetrics) {
  app.useAsync(recordIpAndEndpoint);
}

// response data handling middleware
app.useAsync(responseHandler);

// response error handling middleware
app.useAsync(handleError);

if (!isTestEnv()) {
  const server = app.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
  });

  // Health check endpoints
  createTerminus(server, {
    healthChecks: {
      '/health/readiness': health.readinessCheck,
      '/health/liveness': health.livenessCheck,
    },
    beforeShutdown: health.beforeShutdown,
  });
}

export default app;
