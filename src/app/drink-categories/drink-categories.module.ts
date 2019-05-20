import { GraphQLModule } from '@graphql-modules/core';

import resolvers from './resolvers';
import schemas from './schemas';
import { DrinkCategoryModel } from './models/drink-category.model';
import { DrinkCategoriesProvider } from './providers/drink-categories.provider';
import { CommonModule } from '../common/common.module';
import { DrinksModule } from '../drinks/drinks.module';

export const DrinkCategoriesModule = new GraphQLModule({
  resolvers,
  typeDefs: schemas,
  imports: [CommonModule, DrinksModule],
  providers: [
    { provide: 'DrinkCategoryModel', useValue: DrinkCategoryModel },
    DrinkCategoriesProvider
  ]
});
