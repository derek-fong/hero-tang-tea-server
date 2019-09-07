import { ApolloError } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import jwks from 'jwks-rsa';

import { apolloServer } from './apollo-server';
import { environment } from './environment';

/**
 * Bootstrap GraphQL server.
 */
(async function bootstrapAsync(): Promise<void> {
  const app = express();
  const voyagerEndpointUrl = environment.apollo.server.voyager.endpointUrl;

  app.use(cors({ origin: environment.apollo.server.cors.origins }));

  app.use(
    jwt({
      algorithms: ['RS256'],
      audience: environment.auth.jwt.audience,
      credentialsRequired: false,
      issuer: environment.auth.jwt.issuer,
      secret: jwks.expressJwtSecret({
        cache: environment.auth.jwks.cache,
        rateLimit: environment.auth.jwks.rateLimit,
        jwksRequestsPerMinute: environment.auth.jwks.requestPerMinute,
        jwksUri: environment.auth.jwks.uri,
      }),
    })
  );

  if (voyagerEndpointUrl) {
    app.use(
      '(/:baseDir)?/voyager',
      voyagerMiddleware({ endpointUrl: voyagerEndpointUrl })
    );
  }

  apolloServer.applyMiddleware({ app, path: '/', cors: false });

  try {
    const port = environment.port;

    await app.listen({ port });
    console.log(`GraphQL server is listening on port ${port}. `);
  } catch (error) {
    console.error(error);
    throw new ApolloError(error);
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
          throw new ApolloError(error);
        }
      }
    );
  }
})();
