import promotionsResolver from './promotions.resolver';

describe('promotions resolver', (): void => {
  it('should return 3 promotion strings', (): void => {
    expect(promotionsResolver()).toEqual([
      'Promotion 1',
      'Promotion 2',
      'Promotion 3'
    ]);
  });
});
