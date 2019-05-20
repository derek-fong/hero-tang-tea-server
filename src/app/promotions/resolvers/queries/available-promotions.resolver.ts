import { ModuleContext } from '@graphql-modules/core';

import { PromotionDocument } from '../../models/promotion.model';
import { PromotionsProvider } from '../../providers/promotions.provider';

export async function availablePromotionsAsync(
  root: any,
  args: any,
  { injector }: ModuleContext
): Promise<PromotionDocument[]> {
  return injector.get(PromotionsProvider).getAvailablePromotionsAsync();
}
