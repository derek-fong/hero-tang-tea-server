import { drinksAsync } from './drink-category/drinks.resolver';
import { createDrinkCategoryAsync } from './mutations/create-drink-category.resolver';
import { currentDrinkCategoriesAsync } from './queries/current-drink-categories.resolver';
import { currentDrinkCategoryByIdAsync } from './queries/current-drink-category-by-id.resolver';

export default {
  DrinkCategory: {
    drinks: drinksAsync
  },
  Mutation: {
    createDrinkCategory: createDrinkCategoryAsync
  },
  Query: {
    currentDrinkCategoryById: currentDrinkCategoryByIdAsync,
    currentDrinkCategories: currentDrinkCategoriesAsync
  }
};
