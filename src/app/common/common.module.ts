import { GraphQLModule } from '@graphql-modules/core';

import * as imageSourceSchema from './image-source/image-source.graphql';
import * as imageSourceInputSchema from './image-source/image-source-input.graphql';
import * as nameSchema from './name/name.graphql';
import * as nameInputSchema from './name/name-input.graphql';
import * as scalarsSchema from './scalars/scalars.graphql';
import { scalarsResolvers } from './scalars/scalars.resolver';

const typeDefs = [
  imageSourceSchema,
  imageSourceInputSchema,
  nameInputSchema,
  nameSchema,
  scalarsSchema
];

export const CommonModule = new GraphQLModule({
  typeDefs,
  resolvers: scalarsResolvers
});
