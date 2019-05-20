import 'reflect-metadata';
import { gql } from 'apollo-server';
import { execute, ExecutionResult } from 'graphql';

import { DrinkCategoriesModule } from '../../drink-categories.module';
import { CreateDrinkCategoryInput } from '../../models/create-drink-category-input.model';
import {
  DrinkCategory,
  DrinkCategoryDocument
} from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

describe('createDrinkCategory', (): void => {
  const { injector, schema } = DrinkCategoriesModule;
  const testMutationDocument = gql`
    mutation CreateDrinkCategory($input: CreateDrinkCategoryInput!) {
      createDrinkCategory(input: $input) {
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
  `;
  const testCreateDrinkCategoryInput: CreateDrinkCategoryInput = {
    id: 'TEST_ID',
    name: {
      enAU: 'Test Drink Category'
    },
    description: 'Test drink category. ',
    releasedAt: new Date().toISOString()
  };
  let executionResult: ExecutionResult;

  describe('create drink category succeeded', (): void => {
    const testUserId = 'TEST_USER_ID';
    const newTestDrinkCategory: DrinkCategory = {
      createdAt: new Date().toISOString(),
      createdBy: testUserId,
      updatedAt: new Date().toISOString(),
      updatedBy: testUserId,
      releasedBy: testUserId,
      ...testCreateDrinkCategoryInput
    };
    let drinkCategory: DrinkCategoryDocument;

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: DrinkCategoriesProvider,
          overwrite: true,
          useValue: {
            createDrinkCategoryAsync: async (
              input: CreateDrinkCategoryInput
            ): Promise<DrinkCategoryDocument> =>
              Promise.resolve(newTestDrinkCategory as DrinkCategoryDocument)
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreateDrinkCategoryInput }
        });

        drinkCategory = (executionResult as { data: any }).data[
          'createDrinkCategory'
        ];
      }
    );

    it('returns with no error', (): void => {
      expect(executionResult.errors).toBeFalsy();
    });

    it('creates drink category', (): void => {
      expect(drinkCategory).toBeTruthy();
    });

    it('returns newly created drink category', (): void => {
      expect(drinkCategory.id).toEqual(testCreateDrinkCategoryInput.id);
      expect(drinkCategory.name).toEqual(testCreateDrinkCategoryInput.name);
      expect(drinkCategory.description).toEqual(
        testCreateDrinkCategoryInput.description
      );
      expect(drinkCategory.releasedAt).toEqual(
        testCreateDrinkCategoryInput.releasedAt
      );
    });
  });

  describe('create drink category failed', (): void => {
    const testError = new Error('Test error');

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: DrinkCategoriesProvider,
          overwrite: true,
          useValue: {
            createDrinkCategoryAsync: (
              input: CreateDrinkCategoryInput
            ): Promise<any> => {
              throw testError;
            }
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreateDrinkCategoryInput }
        });
      }
    );

    it('returns an error if failed to create drink category', (): void => {
      expect(executionResult.errors).toBeTruthy();
    });
  });
});
