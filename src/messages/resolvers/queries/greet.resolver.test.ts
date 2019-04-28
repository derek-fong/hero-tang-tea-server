import { UserInputError } from 'apollo-server';

import greetResolver from './greet.resolver';

describe('greet resolver', (): void => {
  it('should return a greeting message with name', (): void => {
    const testName = 'Foo Bar';
    expect(greetResolver(null, { name: testName })).toEqual(
      `Hello, ${testName}!`
    );
  });

  it('should throw an `UserInputError` if name is undefined', (): void => {
    const invalidName = '';

    expect(
      (): void => {
        greetResolver(null, { name: invalidName });
      }
    ).toThrow(UserInputError);
  });
});
