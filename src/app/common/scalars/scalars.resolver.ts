import { EmailAddress } from '@okgrow/graphql-scalars';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

export const scalarsResolvers = {
  EmailAddress,
  Date: GraphQLDate,
  DateTime: GraphQLDateTime
};
