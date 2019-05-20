import { Inject, Injectable } from '@graphql-modules/di';
import { Model } from 'mongoose';

import { CreateDrinkInput } from '../models/create-drink-input.model';
import { DrinkDocument } from '../models/drink.model';

interface NewDrink extends CreateDrinkInput {
  createdBy: string; // TODO: Use `userId`.
  updatedBy: string; // TODO: Use `userId`.
  releasedAt: Date; // REVIEW: Currently defaults to immediate release.
  releasedBy: string; // TODO: Use `userId`.
}

@Injectable()
export class DrinksProvider {
  constructor(@Inject('DrinkModel') private DrinkModel: Model<DrinkDocument>) {}

  /**
   * Create drink.
   * @async
   * @param input - Create drink input.
   * @returns Created drink.
   */
  public async createDrinkAsync(
    input: CreateDrinkInput
  ): Promise<DrinkDocument | null> {
    // TODO: Add validation.
    // TODO: Replace `systemUserId` with `userId`.

    const systemUserId = 'SYSTEM';
    const newDrink: NewDrink = {
      id: input.id,
      name: input.name,
      description: input.description,
      imgSrc: input.imgSrc,
      option: input.option,
      price: input.price,
      drinkCategoryId: input.drinkCategoryId,
      isRecommended: input.isRecommended,
      keywords: input.keywords,
      // REVIEW: Temporary add default `SYSTEM` as user ID and immediate release.
      createdBy: systemUserId,
      updatedBy: systemUserId,
      releasedAt: new Date(),
      releasedBy: systemUserId
    };
    const drink = new this.DrinkModel(newDrink);

    await drink.save();

    return this.DrinkModel.findOne({ _id: drink._id }).populate(
      'drinkCategory'
    );
  }

  /**
   * Get current drink by ID, which has been released and not retired.
   * @async
   * @param drinkId - Drink ID.
   * @returns Current drink with ID specified; `null` if no matching ID or drink is not current.
   */
  public async getCurrentDrinkByIdAsync(
    drinkId: string
  ): Promise<DrinkDocument | null> {
    const currentDateISO = this.getCurrentDateISO();

    return this.DrinkModel.findOne({
      $and: [
        { id: drinkId },
        { releasedAt: { $exists: true } },
        { releasedAt: { $lte: currentDateISO } },
        {
          $or: [
            { retiredAt: { $exists: false } },
            { retiredAt: { $gt: currentDateISO } }
          ]
        }
      ]
    }).populate('drinkCategory');
  }

  /**
   * Get current drinks, which have been released and not retired.
   * @async
   * @returns Current drinks.
   */
  public async getCurrentDrinksAsync(): Promise<DrinkDocument[]> {
    const currentDateISO = this.getCurrentDateISO();

    return this.DrinkModel.find({
      $and: [
        { releasedAt: { $exists: true } },
        { releasedAt: { $lte: currentDateISO } },
        {
          $or: [
            { retiredAt: { $exists: false } },
            { retiredAt: { $gt: currentDateISO } }
          ]
        }
      ]
    }).populate('drinkCategory');
  }

  /**
   * Get current drinks by drink category ID, which have been released and not retired.
   * @async
   * @param drinkCategoryId - Drink category ID.
   * @returns Current drinks that belongs to the category specified.
   */
  public async getCurrentDrinksByDrinkCategoryIdAsync(
    drinkCategoryId: string
  ): Promise<DrinkDocument[]> {
    const currentDateISO = this.getCurrentDateISO();

    return this.DrinkModel.find({
      $and: [
        { drinkCategoryId },
        { releasedAt: { $exists: true } },
        { releasedAt: { $lte: currentDateISO } },
        {
          $or: [
            { retiredAt: { $exists: false } },
            { retiredAt: { $gt: currentDateISO } }
          ]
        }
      ]
    }).populate('drinkCategory');
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
