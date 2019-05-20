import { Inject, Injectable } from '@graphql-modules/di';
import { Model } from 'mongoose';

import { CreatePromotionInput } from '../models/create-promotion-input.model';
import { PromotionDocument } from '../models/promotion.model';

interface NewPromotion extends CreatePromotionInput {
  createdBy: string; // TODO: Use `userId`.
  updatedBy: string; // TODO: Use `userId`.
  releasedAt: Date; // REVIEW: Currently defaults to immediate release.
  releasedBy: string; // TODO: Use `userId`.
}

@Injectable()
export class PromotionsProvider {
  constructor(
    @Inject('PromotionModel') private PromotionModel: Model<PromotionDocument>
  ) {}

  /**
   * Create promotion.
   * @async
   * @param input - Create promotion input.
   * @returns Created promotion.
   */
  public async createPromotionAsync(
    input: CreatePromotionInput
  ): Promise<PromotionDocument> {
    // TODO: Add validation.
    // TODO: Replace `systemUserId` with `userId`.

    const systemUserId = 'SYSTEM';
    const newPromotion: NewPromotion = {
      description: input.description,
      imgSrc: input.imgSrc,
      link: input.link,
      // REVIEW: Temporary add default `SYSTEM` as user ID and immediate release.
      createdBy: systemUserId,
      updatedBy: systemUserId,
      releasedAt: new Date(),
      releasedBy: systemUserId
    };
    const promotion = new this.PromotionModel(newPromotion);

    await promotion.save();

    return promotion;
  }

  /**
   * Get available promotions, which have been released, not suspended and not retired.
   * @returns Available promotions.
   */
  public async getAvailablePromotionsAsync(): Promise<PromotionDocument[]> {
    const currentDateISO = this.getCurrentDateISO();

    return this.PromotionModel.find({
      $and: [
        { releasedAt: { $exists: true } },
        { releasedAt: { $lte: currentDateISO } },
        {
          $or: [
            { suspendedAt: { $exists: false } },
            { suspendedAt: { $gt: currentDateISO } }
          ]
        },
        {
          $or: [
            { retiredAt: { $exists: false } },
            { retiredAt: { $gt: currentDateISO } }
          ]
        }
      ]
    });
  }

  /**
   * Get current date in ISO string.
   * @returns Current date in ISO string.
   */
  /* istanbul ignore next */
  private getCurrentDateISO(): string {
    return new Date().toISOString();
  }
}
