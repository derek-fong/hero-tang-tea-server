import { GraphQLModule } from '@graphql-modules/core';

import providers from './providers';
import typeDefs from './type-definitions';

export const AuthModule = new GraphQLModule({
  providers,
  typeDefs,
  name: 'auth',
});
