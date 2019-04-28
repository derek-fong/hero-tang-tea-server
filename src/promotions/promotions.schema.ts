import { makeExecutableSchema } from 'apollo-server';

import resolvers from './resolvers';

const typeDefs = `
  type Query {
    """
    Promotions string.
    """
    promotions: [String]!
  }
`;

export default makeExecutableSchema({ resolvers, typeDefs });
