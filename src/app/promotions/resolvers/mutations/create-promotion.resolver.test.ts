import 'reflect-metadata';
import { gql } from 'apollo-server-express';
import { execute, ExecutionResult } from 'graphql';

import { PromotionsModule } from '../../promotions.module';
import { CreatePromotionInput } from '../../models/create-promotion-input.model';
import { Promotion, PromotionDocument } from '../../models/promotion.model';
import { PromotionsProvider } from '../../providers/promotions.provider';

describe('createPromotion', (): void => {
  const { injector, schema } = PromotionsModule;
  const testMutationDocument = gql`
    mutation CreatePromotion($input: CreatePromotionInput!) {
      createPromotion(input: $input) {
        id
        description
        imgSrc
        link
        createdAt
        createdBy
        updatedAt
        updatedBy
        releasedAt
        releasedBy
      }
    }
  `;
  const testCreatePromotionInput: CreatePromotionInput = {
    description: 'Test description. ',
    imgSrc: 'http://test-img',
    link: 'http://test'
  };
  let executionResult: ExecutionResult;

  describe('create promotion succeeded', (): void => {
    const testUserId = 'TEST_USER_ID';
    const newTestPromotion: Promotion = {
      id: 'TEST_ID',
      createdAt: new Date().toISOString(),
      createdBy: testUserId,
      updatedAt: new Date().toISOString(),
      updatedBy: testUserId,
      ...testCreatePromotionInput
    };
    let promotion: PromotionDocument;

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: PromotionsProvider,
          overwrite: true,
          useValue: {
            createPromotionAsync: async (
              input: CreatePromotionInput
            ): Promise<PromotionDocument> =>
              Promise.resolve(newTestPromotion as PromotionDocument)
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreatePromotionInput }
        });

        promotion = (executionResult as { data: any }).data['createPromotion'];
      }
    );

    it('returns with no error', (): void => {
      expect(executionResult.errors).toBeFalsy();
    });

    it('creates promotion', (): void => {
      expect(promotion).toBeTruthy();
    });

    it('returns newly created promotion', (): void => {
      expect(promotion.description).toEqual(
        testCreatePromotionInput.description
      );
      expect(promotion.imgSrc).toEqual(testCreatePromotionInput.imgSrc);
      expect(promotion.link).toEqual(testCreatePromotionInput.link);
    });
  });

  describe('create promotion failed', (): void => {
    const testError = new Error('Test error');

    beforeAll(
      async (): Promise<void> => {
        injector.provide({
          provide: PromotionsProvider,
          overwrite: true,
          useValue: {
            createPromotionAsync: (
              input: CreatePromotionInput
            ): Promise<any> => {
              throw testError;
            }
          }
        });

        executionResult = await execute({
          schema,
          document: testMutationDocument,
          variableValues: { input: testCreatePromotionInput }
        });
      }
    );

    it('returns an error if failed to create promotion', (): void => {
      expect(executionResult.errors).toBeTruthy();
    });
  });
});
