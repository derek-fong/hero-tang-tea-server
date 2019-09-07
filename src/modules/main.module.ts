import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';

import { AuditsModule } from './audits/audits.module';
import { AuthModule } from './auth/auth.module';
import { DataStoresModule } from './data-stores/data-stores.module';
import { environment } from '../environment';

export const MainModule = new GraphQLModule({
  imports: [
    DataStoresModule.forRoot({
      mongoDbConfig: {
        autoIndex: environment.name === 'development',
        uri: environment.dataStores.mongoDb.uri,
      },
    }),
    AuthModule,
    AuditsModule,
  ],
  name: 'main',
});

// TODO: Enable on PROD.
//DataStoresModule.injector;
