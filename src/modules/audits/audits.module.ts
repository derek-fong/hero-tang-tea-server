import { GraphQLModule } from '@graphql-modules/core';

import typeDefs from './type-definitions';
import { CategoriesModule } from '../categories/categories.module';
import { CommonModule } from '../common/common.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

export const AuditsModule = new GraphQLModule({
  typeDefs,
  imports: [
    CommonModule,
    CategoriesModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
  ],
  name: 'audits',
});
