import 'reflect-metadata';

import { DrinksProvider } from './drinks.provider';
import { CreateDrinkInput } from '../models/create-drink-input.model';

describe('DrinksProvider', (): void => {
  const testDrinkId = 'TEST_DRINK_ID';
  const MockDrinkModel: any = class {
    public save(): void {}
    public static find(): any {
      return { populate: (): void => {} };
    }
    public static findOne(): any {
      return { populate: (): void => {} };
    }
  };
  const drinksProvider = new DrinksProvider(MockDrinkModel);
  const testDateIsoString = 'TEST_DATE_ISO_STRING';

  beforeAll(
    (): void => {
      jest
        .spyOn(drinksProvider as any, 'getCurrentDateISO')
        .mockReturnValue(testDateIsoString);
    }
  );

  describe('createDrinkAsync', (): void => {
    const testCreateDrinkInput: CreateDrinkInput = {
      id: testDrinkId,
      name: {
        enAU: 'Test Drink'
      },
      description: 'Test drink. ',
      imgSrc: {
        s: 'http://test-img.com',
        m: 'http://test-img.com',
        l: 'http://test-img.com'
      },
      option: {
        iceRatio: true,
        size: true,
        sugarRatio: true,
        teaType: true,
        topping: true
      },
      price: {
        cold: 5.5,
        hot: 5.5
      },
      isRecommended: false,
      keywords: ['test', 'drink']
    };

    it('saves drink', async (): Promise<void> => {
      jest.spyOn(MockDrinkModel.prototype, 'save');
      await drinksProvider.createDrinkAsync(testCreateDrinkInput);

      expect(MockDrinkModel.prototype.save).toHaveBeenCalled();
    });
  });

  describe('getCurrentDrinkByIdAsync', (): void => {
    it('finds one current drink by ID', async (): Promise<void> => {
      jest.spyOn(MockDrinkModel, 'findOne');
      await drinksProvider.getCurrentDrinkByIdAsync(testDrinkId);

      expect(MockDrinkModel.findOne).toHaveBeenCalledWith({
        $and: [
          { id: testDrinkId },
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

  describe('getCurrentDrinksAsync', (): void => {
    it('gets current drinks', async (): Promise<void> => {
      jest.spyOn(MockDrinkModel, 'find');
      await drinksProvider.getCurrentDrinksAsync();

      expect(MockDrinkModel.find).toHaveBeenCalledWith({
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

  describe('getCurrentDrinksByDrinkCategoryIdAsync', (): void => {
    const testDrinkCategoryId = 'TEST_DRINK_CATEGORY_ID';

    it('gets drinks by drink category ID', async (): Promise<void> => {
      jest.spyOn(MockDrinkModel, 'find');
      await drinksProvider.getCurrentDrinksByDrinkCategoryIdAsync(
        testDrinkCategoryId
      );

      expect(MockDrinkModel.find).toHaveBeenCalledWith({
        $and: [
          { drinkCategoryId: testDrinkCategoryId },
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
