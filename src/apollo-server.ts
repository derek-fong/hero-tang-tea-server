import { ApolloServer } from 'apollo-server';

import schema from './schema';
import { environment } from './environment';

const apolloServer = new ApolloServer({
  schema,
  engine: { apiKey: environment.apollo.engine.apiKey },
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
});

export default apolloServer;
