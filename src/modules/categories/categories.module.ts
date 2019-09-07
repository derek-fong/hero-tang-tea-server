import { GraphQLModule } from '@graphql-modules/core';

import typeDefs from './type-definitions';
import { CommonModule } from '../common/common.module';

export const CategoriesModule = new GraphQLModule({
  typeDefs,
  imports: [CommonModule],
  name: 'categories',
});
