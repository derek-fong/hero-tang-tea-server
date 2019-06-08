import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server-express';

import { CreateDrinkInput } from '../../models/create-drink-input.model';
import { DrinkDocument } from '../../models/drink.model';
import { DrinksProvider } from '../../providers/drinks.provider';

interface Arguments {
  input: CreateDrinkInput;
}

export async function createDrinkAsync(
  root: any,
  { input }: Arguments,
  { injector }: ModuleContext
): Promise<DrinkDocument> {
  try {
    const drink = await injector.get(DrinksProvider).createDrinkAsync(input);

    return drink as DrinkDocument;
  } catch (error) {
    throw new ApolloError(`Failed to create drink: ${error.toString()}.`);
  }
}
