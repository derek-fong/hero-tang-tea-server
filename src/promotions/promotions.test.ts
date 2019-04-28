import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import schema from './promotions.schema';

describe('promotions', (): void => {
  const apolloServer = new ApolloServer({ schema });

  describe('query', (): void => {
    const { query } = createTestClient(apolloServer);

    describe('promotions', (): void => {
      const testQuery = gql`
        query Promotions {
          promotions
        }
      `;

      it('should get promotions', async (): Promise<void> => {
        const response = await query({ query: testQuery });

        expect(response.data).toEqual({
          promotions: ['Promotion 1', 'Promotion 2', 'Promotion 3']
        });
      });
    });
  });
});
