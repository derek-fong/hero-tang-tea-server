import 'reflect-metadata';

import { PromotionsProvider } from './promotions.provider';
import { CreatePromotionInput } from '../models/create-promotion-input.model';

describe('PromotionsProvider', (): void => {
  const MockPromotionModel: any = class {
    public save(): void {}
    public static find(): void {}
  };
  const promotionsProvider = new PromotionsProvider(MockPromotionModel);
  const testDateIsoString = 'TEST_DATE_ISO_STRING';

  beforeAll(
    (): void => {
      jest
        .spyOn(promotionsProvider as any, 'getCurrentDateISO')
        .mockReturnValue(testDateIsoString);
    }
  );

  describe('createPromotionAsync', (): void => {
    const testCreatePromotionInput: CreatePromotionInput = {
      description: 'Test description. ',
      imgSrc: 'http://test-img',
      link: 'http://test'
    };

    it('saves promotion', async (): Promise<void> => {
      jest.spyOn(MockPromotionModel.prototype, 'save');
      await promotionsProvider.createPromotionAsync(testCreatePromotionInput);

      expect(MockPromotionModel.prototype.save).toHaveBeenCalled();
    });
  });

  describe('getAvailablePromotionsAsync', (): void => {
    it('finds available promotions', async (): Promise<void> => {
      jest.spyOn(MockPromotionModel, 'find');
      await promotionsProvider.getAvailablePromotionsAsync();

      expect(MockPromotionModel.find).toHaveBeenCalledWith({
        $and: [
          { releasedAt: { $exists: true } },
          { releasedAt: { $lte: testDateIsoString } },
          {
            $or: [
              { suspendedAt: { $exists: false } },
              { suspendedAt: { $gt: testDateIsoString } }
            ]
          },
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
