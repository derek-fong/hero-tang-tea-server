import { mergeSchemas } from 'apollo-server';

import messagesSchema from './messages/messages.schema';
import promotionsSchema from './promotions/promotions.schema';

export default mergeSchemas({
  schemas: [messagesSchema, promotionsSchema]
});
