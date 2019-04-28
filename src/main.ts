import { ServerInfo } from 'apollo-server';

import apolloServer from './apollo-server';
import { environment } from './environment';

/**
 * Bootstrap application server.
 * @async
 */
async function bootstrapAsync(): Promise<void> {
  try {
    const serverInfo: ServerInfo = await apolloServer.listen(environment.port);

    console.log(`GraphQL server is listening on port ${serverInfo.port}. `);
  } catch (error) {
    console.error(error);
  }

  // Hot module replacement.
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(
      async (): Promise<void> => {
        try {
          await apolloServer.stop();
        } catch (error) {
          console.error(error);
        }
      }
    );
  }
}

bootstrapAsync();