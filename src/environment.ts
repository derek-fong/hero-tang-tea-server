const defaultPort = 4000;

export interface Environment {
  apollo: {
    engine: {
      apiKey: string;
    };
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    engine: {
      apiKey: process.env.APOLLO_ENGINE_API_KEY as string
    },
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || defaultPort
};
