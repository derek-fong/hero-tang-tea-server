import 'reflect-metadata';
import { gql } from 'apollo-server';
import { execute, ExecutionResult } from 'graphql';

import { DrinksModule } from '../../drinks.module';
import { CreateDrinkInput } from '../../models/create-drink-input.model';
import { Drink, DrinkDocument } from '../../models/drink.model';
import { DrinksProvider } from '../../providers/drinks.provider';

describe('createDrink', (): void => {
  const { injector, schema } = DrinksModule;
  const testDrinkId = 'TEST_DRINK_ID';
  const testCreateDrinkInput: CreateDrinkInput = {
    id: testDrinkId,
    name: {
      enAU: 'Test Drink'
    },
    description: 'Test drink. ',
    imgSrc: {
      s: 'http://test-img.com',
      m: 'http://test-img.com',
      l: 'http://test-img.com'
    },
    option: {
      iceRatio: true,
      size: true,
      sugarRatio: true,
      teaType: true,
      topping: true
    },
    price: {
      cold: 5.5,
      hot: 5.5
    },
    isRecommended: false,
    keywords: ['test', 'drink']
  };
  const testMutationDocument = gql`
    mutation CreateDrink($input: CreateDrinkInput!) {
      createDrink(input: $input) {
        id
        name {
          enAU
        }
        description
        imgSrc {
          s
          m
          l
        }
        option {
          iceRatio
          size
          sugarRatio
          teaType
          topping
        }
        price {
          cold
          hot
        }
        isRecommended
        keywords
        createdAt
        createdBy
        updatedAt
        updatedBy
        releasedAt
        releasedBy
      }
    }
  `;
  let executionResult: ExecutionResult;

  describe('create drink succeeded', (): void => {
    const testUserId = 'TEST_USER_ID';
    const testDrink: Drink = {
      createdAt: new Date().toISOString(),
      createdBy: testUserId,
      updatedAt: new Date().toISOString(),
      updatedBy: testUserId,
      releasedAt: new Date().toISOString(),
      releasedBy: testUserId,
      ...testCreateDrinkInput
    };
    let newDrink: DrinkDocument;

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: DrinksProvider,
          overwrite: true,
          useValue: {
            createDrinkAsync: async (
              input: CreateDrinkInput
            ): Promise<DrinkDocument | null> =>
              Promise.resolve(testDrink as DrinkDocument)
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreateDrinkInput }
        });

        newDrink = (executionResult as { data: any }).data['createDrink'];
      }
    );

    it('returns with no error', (): void => {
      expect(executionResult.errors).toBeFalsy();
    });

    it('returns newly created drink', (): void => {
      expect(newDrink).toBeTruthy();
      expect(newDrink.id).toEqual(testCreateDrinkInput.id);
      expect(newDrink.name).toEqual(testCreateDrinkInput.name);
      expect(newDrink.description).toEqual(testCreateDrinkInput.description);
      expect(newDrink.imgSrc).toEqual(testCreateDrinkInput.imgSrc);
      expect(newDrink.option).toEqual(testCreateDrinkInput.option);
      expect(newDrink.price).toEqual(testCreateDrinkInput.price);
      expect(newDrink.isRecommended).toEqual(
        testCreateDrinkInput.isRecommended
      );
      expect(newDrink.keywords).toEqual(testCreateDrinkInput.keywords);
    });
  });

  describe('create drink failed', (): void => {
    const testError = new Error('Test error');

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: DrinksProvider,
          overwrite: true,
          useValue: {
            createDrinkAsync: async (
              input: CreateDrinkInput
            ): Promise<DrinkDocument | null> => {
              throw testError;
            }
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreateDrinkInput }
        });
      }
    );

    it('returns an error if failed to create drink', (): void => {
      expect(executionResult.errors).toBeTruthy();
    });
  });
});
