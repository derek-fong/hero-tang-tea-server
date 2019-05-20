import { ModuleContext } from '@graphql-modules/core';
import { ApolloError } from 'apollo-server';

import { PromotionDocument } from '../../models/promotion.model';
import { CreatePromotionInput } from '../../models/create-promotion-input.model';
import { PromotionsProvider } from '../../providers/promotions.provider';

interface Arguments {
  input: CreatePromotionInput;
}

export async function createPromotionAsync(
  root: any,
  { input }: Arguments,
  { injector }: ModuleContext
): Promise<PromotionDocument> {
  try {
    const promotion = await injector
      .get(PromotionsProvider)
      .createPromotionAsync(input);

    return promotion;
  } catch (error) {
    throw new ApolloError(`Failed to create promotion: ${error.toString()}. `);
  }
}
