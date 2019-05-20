import { GraphQLModule } from '@graphql-modules/core';

import resolvers from './resolvers';
import schemas from './schemas';
import { PromotionModel } from './models/promotion.model';
import { PromotionsProvider } from './providers/promotions.provider';
import { CommonModule } from '../common/common.module';

export const PromotionsModule = new GraphQLModule({
  resolvers,
  typeDefs: schemas,
  imports: [CommonModule],
  providers: [
    { provide: 'PromotionModel', useValue: PromotionModel },
    PromotionsProvider
  ]
});
