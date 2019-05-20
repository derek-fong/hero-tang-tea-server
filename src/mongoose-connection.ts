import { connect, Mongoose } from 'mongoose';

/**
 * Connect mongoose.
 * @async
 * @param uri - Database connection string.
 * @param environmentName - Environment name.
 * @returns Mongoose instance.
 */
export async function connectMongooseAsync(
  uri: string,
  environmentName: string
): Promise<Mongoose> {
  const mongoose = await connect(
    uri,
    {
      autoIndex: environmentName === 'development',
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );

  mongoose.set('bufferCommands', false);

  // Close the Mongoose connection on Node process ends,
  const handleGracefulExit = (): void => {
    mongoose.connection.close(
      (): void => {
        console.log(`App terminated. Disconnected from database "${uri}". `);
        process.exit(0);
      }
    );
  };

  process.on('SIGINT', handleGracefulExit).on('SIGTERM', handleGracefulExit);

  mongoose.connection.on(
    'connected',
    (): void => {
      console.log(`Connected to database: ${uri}. `);
    }
  );

  mongoose.connection.on(
    'disconnected',
    (): void => {
      console.log(`Disconnected from database: ${uri}. `);
    }
  );

  mongoose.connection.on(
    'error',
    (error: Error): void => {
      console.error(`Failed to connect to database: ${uri}. `, error);
    }
  );

  return mongoose;
}
