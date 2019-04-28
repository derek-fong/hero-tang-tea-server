import { makeExecutableSchema } from 'apollo-server';

import resolvers from './resolvers';

const typeDefs = `
  type Query {
    """
    Greet message. 
    """
    greet(
      """
      Name to greet. 
      """
      name: String!
    ): String!
  
    """
    Test message.
    """
    message: String
  }
`;

export default makeExecutableSchema({ resolvers, typeDefs });
