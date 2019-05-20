import 'reflect-metadata';
import { gql } from 'apollo-server';
import { execute, ExecutionResult } from 'graphql';

import { DrinksModule } from '../../drinks.module';
import { DrinksProvider } from '../../providers/drinks.provider';
import { Drink, DrinkDocument } from '../../models/drink.model';

describe('currentDrinks', (): void => {
  const { injector, schema } = DrinksModule;
  const testUserId = 'TEST_USER_ID';
  const testDrinks: Drink[] = [
    {
      id: 'TEST_DRINK_1',
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
    },
    {
      id: 'TEST_DRINK_2',
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
    }
  ];
  let drinks: DrinkDocument[];
  let executionResult: ExecutionResult;

  beforeAll(
    async (): Promise<void> => {
      injector.provide({
        provide: DrinksProvider,
        overwrite: true,
        useValue: {
          getCurrentDrinksAsync: async (): Promise<DrinkDocument[]> =>
            Promise.resolve(testDrinks as DrinkDocument[])
        }
      });

      executionResult = await execute({
        schema,
        document: gql`
          query CurrentDrinks {
            currentDrinks {
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
        `
      });

      drinks = (executionResult as { data: any }).data['currentDrinks'];
    }
  );

  it('returns with no error', (): void => {
    expect(executionResult.errors).toBeFalsy();
  });

  it('returns current drinks', (): void => {
    expect(drinks).toHaveLength(2);
    expect(drinks[0].id).toEqual(testDrinks[0].id);
    expect(drinks[0].name).toEqual(testDrinks[0].name);
    expect(drinks[0].description).toEqual(testDrinks[0].description);
    expect(drinks[0].imgSrc).toEqual(testDrinks[0].imgSrc);
    expect(drinks[0].option).toEqual(testDrinks[0].option);
    expect(drinks[0].price).toEqual(testDrinks[0].price);
    expect(drinks[0].isRecommended).toEqual(testDrinks[0].isRecommended);
    expect(drinks[0].keywords).toEqual(testDrinks[0].keywords);
    expect(drinks[1].id).toEqual(testDrinks[1].id);
    expect(drinks[1].name).toEqual(testDrinks[1].name);
    expect(drinks[1].description).toEqual(testDrinks[1].description);
    expect(drinks[1].imgSrc).toEqual(testDrinks[1].imgSrc);
    expect(drinks[1].option).toEqual(testDrinks[1].option);
    expect(drinks[1].price).toEqual(testDrinks[1].price);
    expect(drinks[1].isRecommended).toEqual(testDrinks[1].isRecommended);
    expect(drinks[1].keywords).toEqual(testDrinks[1].keywords);
  });
});
