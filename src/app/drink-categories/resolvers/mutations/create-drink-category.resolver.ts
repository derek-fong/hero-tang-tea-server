import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server';

import { CreateDrinkCategoryInput } from '../../models/create-drink-category-input.model';
import { DrinkCategoryDocument } from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

interface Arguments {
  input: CreateDrinkCategoryInput;
}

export async function createDrinkCategoryAsync(
  root: any,
  { input }: Arguments,
  { injector }: ModuleContext
): Promise<DrinkCategoryDocument> {
  try {
    const drinkCategory = await injector
      .get(DrinkCategoriesProvider)
      .createDrinkCategoryAsync(input);

    return drinkCategory;
  } catch (error) {
    throw new ApolloError(
      `Failed to create drink category: ${error.toString()}. `
    );
  }
}
