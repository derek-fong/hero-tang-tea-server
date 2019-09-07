import { GraphQLModule } from '@graphql-modules/core';

import typeDefs from './type-definitions';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

export const UsersModule = new GraphQLModule({
  typeDefs,
  imports: [CommonModule, AuthModule],
  name: 'users',
});
