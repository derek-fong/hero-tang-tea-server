import express from 'express';
import cors from 'cors';

import { apolloServer } from './apollo-server';
import { environment } from './environment';
import { connectMongooseAsync } from './mongoose-connection';

/**
 * Bootstrap application server.
 * @async
 */
async function bootstrapAsync(): Promise<void> {
  try {
    await connectMongooseAsync(
      environment.database.mongo.uri,
      environment.name
    );

    const app = express();

    app.use(cors({ origin: environment.cors.origins }));

    apolloServer.applyMiddleware({
      app,
      path: '/',
      cors: false
    });

    await app.listen({ port: environment.port });

    console.log(`GraphQL server is listening on port ${environment.port}. `);
  } catch (error) {
    console.error(error);
  }

  // Hot module replacement.
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(
      async (): Promise<void> => {
        try {
          await apolloServer.stop();
        } catch (error) {
          console.error(error);
        }
      }
    );
  }
}

bootstrapAsync();
