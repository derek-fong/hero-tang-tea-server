import { ApolloServer } from 'apollo-server-express';

import { environment } from './environment';
import { AppModule } from './app/app.module';

const { schema } = AppModule;

export const apolloServer = new ApolloServer({
  schema,
  engine: { apiKey: environment.apollo.engine.apiKey },
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
});
