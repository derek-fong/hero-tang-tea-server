import { createPromotionAsync } from './mutations/create-promotion.resolver';
import { availablePromotionsAsync } from './queries/available-promotions.resolver';

export default {
  Mutation: {
    createPromotion: createPromotionAsync
  },
  Query: {
    availablePromotions: availablePromotionsAsync
  }
};
