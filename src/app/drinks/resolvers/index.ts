import { createDrinkAsync } from './mutations/create-drink.resolver';
import { currentDrinkByIdAsync } from './queries/current-drink-by-id.resolver';
import { currentDrinksAsync } from './queries/current-drinks.resolver';

export default {
  Mutation: {
    createDrink: createDrinkAsync
  },
  Query: {
    currentDrinkById: currentDrinkByIdAsync,
    currentDrinks: currentDrinksAsync
  }
};
