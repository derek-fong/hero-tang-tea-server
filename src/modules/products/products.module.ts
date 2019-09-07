import { GraphQLModule } from '@graphql-modules/core';

import { resolversComposition } from './resolvers';
import typeDefs from './type-definitions';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { CommonModule } from '../common/common.module';

export const ProductsModule = new GraphQLModule({
  resolvers: {
    Query: {
      testMessage: () => 'test message!',
    },
  },
  resolversComposition,
  typeDefs,
  imports: [CommonModule, AuthModule, CategoriesModule],
  name: 'products',
});
