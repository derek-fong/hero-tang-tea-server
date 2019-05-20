import { Inject, Injectable } from '@graphql-modules/di';
import { Model } from 'mongoose';

import { DrinkCategoryDocument } from '../models/drink-category.model';
import { CreateDrinkCategoryInput } from '../models/create-drink-category-input.model';

interface NewDrinkCategory extends CreateDrinkCategoryInput {
  createdBy: string; // TODO: Use `userId`.
  updatedBy: string; // TODO: Use `userId`.
  releasedAt: Date; // REVIEW: Currently defaults to immediate release.
  releasedBy: string; // TODO: Use `userId`.
}

@Injectable()
export class DrinkCategoriesProvider {
  constructor(
    @Inject('DrinkCategoryModel')
    private DrinkCategoryModel: Model<DrinkCategoryDocument>
  ) {}

  /**
   * Create drink category.
   * @async
   * @param input - Create drink category input.
   * @returns Created Drink category.
   */
  public async createDrinkCategoryAsync(
    input: CreateDrinkCategoryInput
  ): Promise<DrinkCategoryDocument> {
    // TODO: Add validation.
    // TODO: Replace `systemUserId` with `userId`.

    const systemUserId = 'SYSTEM';
    const newDrinkCategory: NewDrinkCategory = {
      id: input.id,
      name: input.name,
      description: input.description,
      // REVIEW: Temporary add default `SYSTEM` as user ID and immediate release.
      createdBy: systemUserId,
      updatedBy: systemUserId,
      releasedAt: new Date(),
      releasedBy: systemUserId
    };
    const drinkCategory = new this.DrinkCategoryModel(newDrinkCategory);

    await drinkCategory.save();

    return drinkCategory;
  }

  /**
   * Get current drink categories, which have been released and not retired.
   * @async
   * @returns Current drink categories.
   */
  public async getCurrentDrinkCategoriesAsync(): Promise<
    DrinkCategoryDocument[]
  > {
    const currentDateISO = this.getCurrentDateISO();

    return this.DrinkCategoryModel.find({
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
    });
  }

  /**
   * Get current drink category by ID, which has been released and not retired.
   * @async
   * @param drinkCategoryId - Drink category ID.
   * @returns Current drink category with ID specified; `null` if no matching ID or drink category is not current.
   */
  public async getCurrentDrinkCategoryByIdAsync(
    drinkCategoryId: string
  ): Promise<DrinkCategoryDocument | null> {
    const currentDateISO = this.getCurrentDateISO();

    return this.DrinkCategoryModel.findOne({
      $and: [
        { id: drinkCategoryId },
        { releasedAt: { $exists: true } },
        { releasedAt: { $lte: currentDateISO } },
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
