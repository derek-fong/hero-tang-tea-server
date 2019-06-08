import 'reflect-metadata';
import { gql } from 'apollo-server-express';
import { execute, ExecutionResult } from 'graphql';

import { Promotion } from '../../models/promotion.model';
import { PromotionsModule } from '../../promotions.module';
import { PromotionsProvider } from '../../providers/promotions.provider';

const testUserId = 'TEST_USER';
const testPromotions: Promotion[] = [
  {
    id: 'TEST_001',
    description: 'Test 001. ',
    imgSrc: 'http://test-img',
    link: 'http://test',
    createdAt: new Date(),
    createdBy: testUserId,
    updatedAt: new Date(),
    updatedBy: testUserId
  },
  {
    id: 'TEST_002',
    description: 'Test 002. ',
    imgSrc: 'http://test-img',
    link: 'http://test',
    createdAt: new Date(),
    createdBy: testUserId,
    updatedAt: new Date(),
    updatedBy: testUserId
  }
];

describe('availablePromotions', (): void => {
  const { injector, schema } = PromotionsModule;
  let availablePromotions: Promotion[];
  let executionResult: ExecutionResult;

  beforeAll(
    async (): Promise<void> => {
      injector.provide({
        provide: PromotionsProvider,
        overwrite: true,
        useValue: {
          getAvailablePromotionsAsync: async (): Promise<Promotion[]> =>
            Promise.resolve(testPromotions)
        }
      });

      executionResult = await execute({
        schema,
        document: gql`
          query AvailablePromotions {
            availablePromotions {
              id
              description
              imgSrc
              link
            }
          }
        `
      });

      availablePromotions = (executionResult as { data: any }).data[
        'availablePromotions'
      ];
    }
  );

  it('returns with no error', (): void => {
    expect(executionResult.errors).toBeFalsy();
  });

  it('gets available promotions', (): void => {
    expect(availablePromotions).toHaveLength(testPromotions.length);
  });

  it('returns correct promotion id', (): void => {
    expect(availablePromotions[0].id).toEqual(testPromotions[0].id);
    expect(availablePromotions[1].id).toEqual(testPromotions[1].id);
  });

  it('returns correct promotion description', (): void => {
    expect(availablePromotions[0].description).toEqual(
      testPromotions[0].description
    );
    expect(availablePromotions[1].description).toEqual(
      testPromotions[1].description
    );
  });

  it('returns correct promotion image source', (): void => {
    expect(availablePromotions[0].imgSrc).toEqual(testPromotions[0].imgSrc);
    expect(availablePromotions[1].imgSrc).toEqual(testPromotions[1].imgSrc);
  });

  it('returns correct promotion link', (): void => {
    expect(availablePromotions[0].link).toEqual(testPromotions[0].link);
    expect(availablePromotions[1].link).toEqual(testPromotions[1].link);
  });
});
