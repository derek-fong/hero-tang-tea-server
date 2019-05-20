import 'reflect-metadata';
import { gql } from 'apollo-server';
import { execute } from 'graphql';

import { DrinksModule } from '../../drinks.module';
import { DrinksProvider } from '../../providers/drinks.provider';
import { Drink, DrinkDocument } from '../../models/drink.model';
import { ExecutionResult } from 'graphql';

describe('currentDrinkById', (): void => {
  const { injector, schema } = DrinksModule;
  const testDrinkId = 'TEST_DRINK_ID';
  const testUserId = 'TEST_USER_ID';
  const testDrink: Drink = {
    id: testDrinkId,
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
    isRecommended: false,
    keywords: ['test', 'drink'],
    createdAt: new Date().toISOString(),
    createdBy: testUserId,
    updatedAt: new Date().toISOString(),
    updatedBy: testUserId,
    releasedAt: new Date().toISOString(),
    releasedBy: testUserId
  };
  let drink: DrinkDocument;
  let executionResult: ExecutionResult;

  beforeAll(
    async (): Promise<void> => {
      injector.provide({
        provide: DrinksProvider,
        overwrite: true,
        useValue: {
          getCurrentDrinkByIdAsync: async (
            drinkId: string
          ): Promise<DrinkDocument | null> =>
            Promise.resolve(testDrink as DrinkDocument)
        }
      });

      executionResult = await execute({
        schema,
        document: gql`
          query CurrentDrinkById($id: ID!) {
            currentDrinkById(id: $id) {
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
        `,
        variableValues: { id: testDrinkId }
      });

      drink = (executionResult as { data: any }).data['currentDrinkById'];
    }
  );

  it('returns with no error', (): void => {
    expect(executionResult.errors).toBeFalsy();
  });

  it('returns current drink with matching ID', (): void => {
    expect(drink.id).toEqual(testDrink.id);
    expect(drink.name).toEqual(testDrink.name);
    expect(drink.description).toEqual(testDrink.description);
    expect(drink.imgSrc).toEqual(testDrink.imgSrc);
    expect(drink.option).toEqual(testDrink.option);
    expect(drink.price).toEqual(testDrink.price);
    expect(drink.isRecommended).toEqual(testDrink.isRecommended);
    expect(drink.keywords).toEqual(testDrink.keywords);
  });
});
