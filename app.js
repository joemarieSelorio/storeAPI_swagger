require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const TAG = '[app]';
const express = require('express');
const cors = require('cors');
const {logger} = require('src/utilities/');
const HttpError = require('src/responses/HttpError');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Mysql
const {createConnection} = require('mysql');
const {HOST, USERNAME, PASSWORD, DATABASE} = process.env;

// Swagger
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const swaggerResolve = require('json-refs').resolveRefs;
const swStats = require('swagger-stats');
const ValidationError = require('src/responses/SwaggerValidationError');

const app = express();

const connection = createConnection({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect((err)=>{
  if (err) {
    logger.error(err.message);
    return;
  }
  logger.info('mysql intiatated');
});

const apiRoot = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname,
    './api/docs/swagger.yaml')).toString());

const swaggerOptions = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: (res, callback) => {
      callback(null, jsyaml.safeLoad(res.text));
    },
  },
};

swaggerResolve(apiRoot, swaggerOptions)
    .then((spec) => {
      const swaggerDoc = jsyaml.safeDump(spec.resolved);

      // Routing Configuration
      const options = {
        swaggerUI: JSON.stringify(spec.resolved),
        controllers: path.join(__dirname, './src/components'),
      };

      const apiSpec = options.swaggerUI;

      swaggerTools.initializeMiddleware(jsyaml.safeLoad(swaggerDoc),
          (middleware) => {
            // CORS
            // TODO: Be specific with the domain that
            //       is allowed to access the api
            app.use(cors());
            // APM Telemetry
            app.use(swStats.getMiddleware({swaggerSpec: apiSpec}));

            // Log incomming requests
            app.use((req, res, next) => {
              logger.info(`${req.method} ${req.originalUrl}`);

              res.on('finish', () => {
                logger.info(`${res.statusCode} ${res.statusMessage}; 
              ${res.get('Content-Length') || 0} b sent`);
              });
              next();
            });

            // Body-parser middleware
            app.use(bodyParser.json());

            // Interpret Swagger resources and attach metadata to request
            app.use(middleware.swaggerMetadata());

            // Validate requests
            app.use(middleware.swaggerValidator());

            // Route validated request to appropriate controller
            app.use(middleware.swaggerRouter(options));

            // Error middleware
            app.use((error, req, res, next) => {
              logger.error(`${TAG} ${error}`);
              if (error.failedValidation) {
                const errorObj = new ValidationError(
                    null, error.results.errors);
                return res.status(errorObj.status).json(errorObj);
              } else if (!(error instanceof HttpError)) {
                const errorObj = new HttpError();
                return res.status(errorObj.status).json(errorObj);
              } else {
                return res.status(error.status).json(error);
              }
            });
            /**
           * Uniform JSON response object sendin
           * @param {objec} req - Request object
           * @param {oject} res - Response object
           * @return {function} - Function call to send response to user
           */

            // Serve Swagger document with UI
            app.use(middleware.swaggerUi());

            app.listen(process.env.APP_PORT || 8080, async () => {
              logger.info(`[API] ` +
                `${process.env.APP_HOST}:${process.env.APP_PORT}`);
              logger.info(`[DOCS] ` +
                `${process.env.APP_HOST}:${process.env.APP_PORT}/docs`);
              logger.info(`[TELEMETRY] ${process.env.APP_HOST}:` +
                `${process.env.APP_PORT}/swagger-stats/ui`);
            });
          });
    });
