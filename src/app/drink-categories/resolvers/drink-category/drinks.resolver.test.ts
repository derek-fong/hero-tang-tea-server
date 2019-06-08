import 'reflect-metadata';
import { gql } from 'apollo-server-express';
import { execute, ExecutionResult } from 'graphql';

import { DrinkCategoriesModule } from '../../drink-categories.module';
import { Drink, DrinkDocument } from '../../../drinks/models/drink.model';
import { DrinksProvider } from '../../../drinks/providers/drinks.provider';
import {
  DrinkCategory,
  DrinkCategoryDocument
} from '../../models/drink-category.model';
import { DrinkCategoriesProvider } from '../../providers/drink-categories.provider';

describe('drinkCategories', (): void => {
  const { injector, schema } = DrinkCategoriesModule;

  describe('drinks', (): void => {
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

    const testDrink: Drink = {
      id: 'TEST_DRINK_ID',
      name: {
        enAU: 'Test Drink'
      },
      description: 'Test drink description. ',
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
      drinkCategory: testDrinkCategory,
      isRecommended: false,
      keywords: ['test', 'drink'],
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
          provide: DrinksProvider,
          overwrite: true,
          useValue: {
            getCurrentDrinksByDrinkCategoryIdAsync: async (
              drinkCategoryId: string
            ): Promise<DrinkDocument[]> =>
              Promise.resolve([testDrink as DrinkDocument])
          }
        });

        injector.provide({
          provide: DrinkCategoriesProvider,
          overwrite: true,
          useValue: {
            getCurrentDrinkCategoryByIdAsync: async (
              drinkCategoryId: string
            ): Promise<DrinkCategoryDocument | null> =>
              Promise.resolve(testDrinkCategory as DrinkCategoryDocument)
          }
        });

        executionResult = await execute({
          schema,
          document: gql`
            query currentDrinkCategoryById($id: ID!) {
              currentDrinkCategoryById(id: $id) {
                drinks {
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

    it('returns drinks belongs to category specified', async (): Promise<
      void
    > => {
      expect(drinkCategory.drinks).toHaveLength(1);

      const testResultDrink = drinkCategory.drinks![0];

      expect(testResultDrink.id).toEqual(testDrink.id);
      expect(testResultDrink.name).toEqual(testDrink.name);
      expect(testResultDrink.description).toEqual(testDrink.description);
      expect(testResultDrink.imgSrc).toEqual(testDrink.imgSrc);
      expect(testResultDrink.option).toEqual(testDrink.option);
      expect(testResultDrink.price).toEqual(testDrink.price);
      expect(testResultDrink.isRecommended).toEqual(testDrink.isRecommended);
      expect(testResultDrink.keywords).toEqual(testDrink.keywords);
    });
  });
});
