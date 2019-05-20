import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';

import { DrinkCategoriesModule } from './drink-categories/drink-categories.module';
import { DrinksModule } from './drinks/drinks.module';
import { PromotionsModule } from './promotions/promotions.module';

export const AppModule = new GraphQLModule({
  imports: [DrinkCategoriesModule, DrinksModule, PromotionsModule]
});
