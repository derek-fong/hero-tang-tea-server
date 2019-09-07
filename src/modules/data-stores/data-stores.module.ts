import { GraphQLModule } from '@graphql-modules/core';

import { DataStoresModuleConfig } from './models';
import providers from './providers';

export const DataStoresModule = new GraphQLModule<DataStoresModuleConfig>({
  providers,
  name: 'dataStores',
});
