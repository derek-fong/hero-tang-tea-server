import message from './message.resolver';

describe('message resolver', (): void => {
  it('should return "Test message. "', (): void => {
    expect(message()).toEqual('Test message. ');
  });
});
