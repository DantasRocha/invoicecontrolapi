import {ApplicationConfig, InvoicecontrolApplication} from './application';
import './env';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new InvoicecontrolApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST,
      basePath: process.env.BASE_PATH ?? '/',
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },

    // firebase: {
    //   projectId: process.env.FIREBASE_PROJECT_ID,
    // },
    // jwt: {
    //   secret: process.env.JWT_SECRET ?? 'UzNWclFIRjFhU1pJUUhJNVlRbz0K',
    //   expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    // },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
