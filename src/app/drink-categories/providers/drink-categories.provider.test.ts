import 'reflect-metadata';

import { DrinkCategoriesProvider } from './drink-categories.provider';
import { CreateDrinkCategoryInput } from '../models/create-drink-category-input.model';

describe('DrinkCategoriesProvider', (): void => {
  const testDrinkCategoryId = 'TEST_DRINK_CATEGORY_ID';
  const MockDrinkCategoryModel: any = class {
    public save(): void {}
    public static find(): void {}
    public static findOne(): void {}
  };
  const drinkCategoriesProvider = new DrinkCategoriesProvider(
    MockDrinkCategoryModel
  );
  const testDateIsoString = 'TEST_DATE_ISO_STRING';

  beforeAll(
    (): void => {
      jest
        .spyOn(drinkCategoriesProvider as any, 'getCurrentDateISO')
        .mockReturnValue(testDateIsoString);
    }
  );

  describe('createDrinkCategoryAsync', (): void => {
    const testCreateDrinkCategoryInput: CreateDrinkCategoryInput = {
      id: testDrinkCategoryId,
      name: {
        enAU: 'Test drink category'
      },
      description: 'Test drink category. '
    };

    it('saves drink category', async (): Promise<void> => {
      jest.spyOn(MockDrinkCategoryModel.prototype, 'save');
      await drinkCategoriesProvider.createDrinkCategoryAsync(
        testCreateDrinkCategoryInput
      );

      expect(MockDrinkCategoryModel.prototype.save).toHaveBeenCalled();
    });
  });

  describe('getCurrentDrinkCategoriesAsync', (): void => {
    it('finds current drink categories', async (): Promise<void> => {
      jest.spyOn(MockDrinkCategoryModel, 'find');
      await drinkCategoriesProvider.getCurrentDrinkCategoriesAsync();

      expect(MockDrinkCategoryModel.find).toHaveBeenCalledWith({
        $and: [
          { releasedAt: { $exists: true } },
          { releasedAt: { $lte: testDateIsoString } },
          {
            $or: [
              { retiredAt: { $exists: false } },
              { retiredAt: { $gt: testDateIsoString } }
            ]
          }
        ]
      });
    });
  });

  describe('getCurrentDrinkCategoryByIdAsync', (): void => {
    it('finds one current drink category by ID', async (): Promise<void> => {
      jest.spyOn(MockDrinkCategoryModel, 'findOne');
      await drinkCategoriesProvider.getCurrentDrinkCategoryByIdAsync(
        testDrinkCategoryId
      );

      expect(MockDrinkCategoryModel.findOne).toHaveBeenCalledWith({
        $and: [
          { id: testDrinkCategoryId },
          { releasedAt: { $exists: true } },
          { releasedAt: { $lte: testDateIsoString } },
          {
            $or: [
              { retiredAt: { $exists: false } },
              { retiredAt: { $gt: testDateIsoString } }
            ]
          }
        ]
      });
    });
  });
});
