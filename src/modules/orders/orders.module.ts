import { GraphQLModule } from '@graphql-modules/core';

import typeDefs from './type-definitions';
import { ProductsModule } from '../products/products.module';

export const OrdersModule = new GraphQLModule({
  typeDefs,
  imports: [ProductsModule],
  name: 'orders',
});
