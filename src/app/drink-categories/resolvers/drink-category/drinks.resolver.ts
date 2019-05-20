import { ModuleContext } from '@graphql-modules/core';

import { DrinkCategory } from '../../models/drink-category.model';
import { DrinkDocument } from '../../../drinks/models/drink.model';
import { DrinksProvider } from '../../../drinks/providers/drinks.provider';

export async function drinksAsync(
  drinkCategory: DrinkCategory,
  args: any,
  { injector }: ModuleContext
): Promise<DrinkDocument[]> {
  return injector
    .get(DrinksProvider)
    .getCurrentDrinksByDrinkCategoryIdAsync(drinkCategory.id);
}
