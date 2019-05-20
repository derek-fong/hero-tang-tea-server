import { ModuleContext } from '@graphql-modules/core';

import { DrinkDocument } from '../../models/drink.model';
import { DrinksProvider } from '../../providers/drinks.provider';

export async function currentDrinksAsync(
  root: any,
  args: any,
  { injector }: ModuleContext
): Promise<DrinkDocument[]> {
  return injector.get(DrinksProvider).getCurrentDrinksAsync();
}
