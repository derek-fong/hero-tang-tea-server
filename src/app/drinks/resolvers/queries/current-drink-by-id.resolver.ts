import { ModuleContext } from '@graphql-modules/core';

import { DrinkDocument } from '../../models/drink.model';
import { DrinksProvider } from '../../providers/drinks.provider';

interface Arguments {
  id: string;
}

export async function currentDrinkByIdAsync(
  root: any,
  { id }: Arguments,
  { injector }: ModuleContext
): Promise<DrinkDocument | null> {
  return injector.get(DrinksProvider).getCurrentDrinkByIdAsync(id);
}
