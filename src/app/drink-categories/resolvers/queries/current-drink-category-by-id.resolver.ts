import { ModuleContext } from '@graphql-modules/core';

import { DrinkCategoryDocument } from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

interface Arguments {
  id: string;
}

export async function currentDrinkCategoryByIdAsync(
  root: any,
  { id }: Arguments,
  { injector }: ModuleContext
): Promise<DrinkCategoryDocument | null> {
  return injector
    .get(DrinkCategoriesProvider)
    .getCurrentDrinkCategoryByIdAsync(id);
}
