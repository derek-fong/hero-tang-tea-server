import { connect, Mongoose } from 'mongoose';
import { ModuleConfig, OnInit } from '@graphql-modules/core';
import { Inject, Injectable } from '@graphql-modules/di';

import { DataStoresModuleConfig } from '../models';

@Injectable()
export class MongooseProvider implements OnInit {
  private mongoose: Mongoose | undefined = undefined;

  constructor(
    @Inject(ModuleConfig)
    private dataStoresModuleConfig: DataStoresModuleConfig
  ) {}

  /**
   * Graphql Module's `OnInit` hook.
   * Executes when application is started.
   * @see https://graphql-modules.com/docs/introduction/dependency-injection#oninit-hook
   */
  async onInit(): Promise<void> {
    await this.connectAsync();
  }

  /**
   * Connect to MongoDB with Mongoose.
   */
  async connectAsync(): Promise<void> {
    const uri = this.dataStoresModuleConfig.mongoDbConfig.uri;

    this.mongoose = await connect(
      uri,
      {
        autoIndex: this.dataStoresModuleConfig.mongoDbConfig.autoIndex,
        useCreateIndex: true,
        useNewUrlParser: true,
      }
    );

    this.mongoose.set('bufferCommands', false);

    // Close the Mongoose connection on Node process ends.
    const handleGracefulExit = (): void => {
      (this.mongoose as Mongoose).connection.close((): void => {
        console.log(`App terminated. Disconnected from database "${uri}". `);
        process.exit(0);
      });
    };

    process.on('SIGINT', handleGracefulExit).on('SIGTERM', handleGracefulExit);

    this.mongoose.connection.on('connected', (): void => {
      console.log(`Connected to database: ${uri}. `);
    });

    this.mongoose.connection.on('disconnected', (): void => {
      console.log(`Disconnected from database: ${uri}. `);
    });

    this.mongoose.connection.on('error', (error: Error): void => {
      console.error(`Failed to connect to database: ${uri}. `, error);
    });
  }
}
