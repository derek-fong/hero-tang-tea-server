import { GraphQLModule } from '@graphql-modules/core';

import resolvers from './resolvers';
import typeDefs from './schemas';
import { DrinkModel } from './models/drink.model';
import { DrinksProvider } from './providers/drinks.provider';
import { CommonModule } from '../common/common.module';

export const DrinksModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [CommonModule],
  providers: [{ provide: 'DrinkModel', useValue: DrinkModel }, DrinksProvider]
});
