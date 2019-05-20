import { ModuleContext } from '@graphql-modules/core';

import { DrinkCategoryDocument } from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

export async function currentDrinkCategoriesAsync(
  root: any,
  args: any,
  { injector }: ModuleContext
): Promise<DrinkCategoryDocument[]> {
  return injector.get(DrinkCategoriesProvider).getCurrentDrinkCategoriesAsync();
}
