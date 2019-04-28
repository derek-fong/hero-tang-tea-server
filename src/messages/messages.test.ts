import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import schema from './messages.schema';

describe('messages', (): void => {
  const apolloServer = new ApolloServer({ schema });

  describe('query', (): void => {
    const { query } = createTestClient(apolloServer);

    describe('greet', (): void => {
      const testQuery = gql`
        query Greet($name: String!) {
          greet(name: $name)
        }
      `;

      it('should get a greet message with name', async (): Promise<void> => {
        const testName = 'Foo Bar';
        const variables = { name: testName };

        const response = await query({
          variables,
          query: testQuery
        } as any);

        expect(response.data).toEqual({ greet: `Hello, ${testName}!` });
      });

      it('should throw an error if name is undefined', async (): Promise<
        void
      > => {
        const variables = { name: '' };
        const response = await query({ variables, query: testQuery } as any);

        expect(response.errors).toHaveLength(1);
        expect((response.errors as Error[])[0]).toHaveProperty(
          'message',
          'Name is undefined. '
        );
      });
    });

    describe('message', (): void => {
      const testQuery = gql`
        query Message {
          message
        }
      `;

      it('should get "Test message"', async (): Promise<void> => {
        const response = await query({ query: testQuery });
        expect(response.data).toEqual({ message: 'Test message. ' });
      });
    });
  });
});
