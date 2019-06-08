import 'reflect-metadata';
import { gql } from 'apollo-server-express';
import { execute, ExecutionResult } from 'graphql';

import { DrinkCategoriesModule } from '../../drink-categories.module';
import {
  DrinkCategory,
  DrinkCategoryDocument
} from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

describe('currentDrinkCategoryById', (): void => {
  const { injector, schema } = DrinkCategoriesModule;
  const testDrinkCategoryId = 'TEST_DRINK_CATEGORY_ID';
  const testUserId = 'TEST_USER_ID';
  const testDrinkCategory: DrinkCategory = {
    id: testDrinkCategoryId,
    name: {
      enAU: 'Test Drink category. '
    },
    description: 'Test drink category description. ',
    createdAt: new Date().toISOString(),
    createdBy: testUserId,
    updatedAt: new Date().toISOString(),
    updatedBy: testUserId,
    releasedAt: new Date().toISOString(),
    releasedBy: testUserId
  };
  let drinkCategory: DrinkCategory;
  let executionResult: ExecutionResult;

  beforeAll(
    async (): Promise<void> => {
      injector.provide({
        provide: DrinkCategoriesProvider,
        overwrite: true,
        useValue: {
          getCurrentDrinkCategoryByIdAsync: (
            drinkCategoryId: string
          ): Promise<DrinkCategoryDocument | null> =>
            Promise.resolve(testDrinkCategory as DrinkCategoryDocument)
        }
      });

      executionResult = await execute({
        schema,
        document: gql`
          query CurrentCategoryById($id: ID!) {
            currentDrinkCategoryById(id: $id) {
              id
              name {
                enAU
              }
              description
              createdAt
              createdBy
              updatedAt
              updatedBy
              releasedAt
              releasedBy
            }
          }
        `,
        variableValues: { id: testDrinkCategoryId }
      });

      drinkCategory = (executionResult as { data: any }).data[
        'currentDrinkCategoryById'
      ];
    }
  );

  it('returns with no error', (): void => {
    expect(executionResult.errors).toBeFalsy();
  });

  it('returns current drink category with matching ID', (): void => {
    expect(drinkCategory.id).toEqual(testDrinkCategory.id);
    expect(drinkCategory.name).toEqual(testDrinkCategory.name);
    expect(drinkCategory.description).toEqual(testDrinkCategory.description);
  });
});
