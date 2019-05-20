import 'reflect-metadata';
import { gql } from 'apollo-server';
import { execute, ExecutionResult } from 'graphql';

import { DrinkCategoriesModule } from '../../drink-categories.module';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';
import { DrinkCategory } from '../../models/drink-category.model';

const testUserId = 'TEST_USER';
const testDrinkCategories: DrinkCategory[] = [
  {
    id: 'TEST_001',
    name: { enAU: 'Test Drink 1' },
    description: 'Test 001',
    createdAt: new Date(),
    createdBy: testUserId,
    updatedAt: new Date(),
    updatedBy: testUserId
  },
  {
    id: 'TEST_002',
    name: { enAU: 'Test Drink 2' },
    description: 'Test 002',
    createdAt: new Date(),
    createdBy: testUserId,
    updatedAt: new Date(),
    updatedBy: testUserId
  }
];

describe('currentDrinkCategories', (): void => {
  const { injector, schema } = DrinkCategoriesModule;
  let currentDrinkCategories: DrinkCategory[];
  let executionResult: ExecutionResult;

  beforeAll(
    async (): Promise<void> => {
      injector.provide({
        provide: DrinkCategoriesProvider,
        overwrite: true,
        useValue: {
          getCurrentDrinkCategoriesAsync: async (): Promise<DrinkCategory[]> =>
            Promise.resolve(testDrinkCategories)
        }
      });

      executionResult = await execute({
        schema,
        document: gql`
          query CurrentDrinkCategories {
            currentDrinkCategories {
              id
              name {
                enAU
              }
              description
            }
          }
        `
      });

      currentDrinkCategories = (executionResult as { data: any }).data[
        'currentDrinkCategories'
      ];
    }
  );

  it('returns with no error', (): void => {
    expect(executionResult.errors).toBeFalsy();
  });

  it('gets current drink categories', (): void => {
    expect(currentDrinkCategories).toHaveLength(testDrinkCategories.length);
  });

  it('returns correct drink category ID', (): void => {
    expect(currentDrinkCategories[0].id).toEqual(testDrinkCategories[0].id);
    expect(currentDrinkCategories[1].id).toEqual(testDrinkCategories[1].id);
  });

  it('returns correct drink category name', (): void => {
    expect(currentDrinkCategories[0].name).toEqual(testDrinkCategories[0].name);
    expect(currentDrinkCategories[1].name).toEqual(testDrinkCategories[1].name);
  });

  it('returns correct drink category description', (): void => {
    expect(currentDrinkCategories[0].description).toEqual(
      testDrinkCategories[0].description
    );
    expect(currentDrinkCategories[1].description).toEqual(
      testDrinkCategories[1].description
    );
  });
});
