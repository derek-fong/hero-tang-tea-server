import { EmailAddress } from '@okgrow/graphql-scalars';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

export default {
  EmailAddress,
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
};
