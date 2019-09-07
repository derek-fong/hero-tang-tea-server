import { ApolloServer } from 'apollo-server-express';

import { environment } from './environment';
import { MainModule } from './modules/main.module';

export const apolloServer = new ApolloServer({
  context: session => session,
  engine: {
    apiKey: environment.apollo.engine.apiKey,
    schemaTag: environment.apollo.engine.schemaTag,
  },
  introspection: environment.apollo.server.introspection,
  mocks: true,
  mockEntireSchema: false,
  modules: [MainModule],
  playground: environment.apollo.server.playground,
});
