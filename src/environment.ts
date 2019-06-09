function getCorsOrigins(origins: string): string[] {
  return origins
    ? origins.split(',').map((origin: string): string => origin.trim())
    : [];
}

const defaultPort = 4000;

export interface Environment {
  apollo: {
    engine: {
      apiKey: string;
    };
    introspection: boolean;
    playground: boolean;
  };
  cors: {
    origins: string[];
  };
  database: {
    mongo: {
      uri: string;
    };
  };
  name: string;
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
  cors: {
    origins: getCorsOrigins(process.env.CORS_ORIGINS as string)
  },
  database: {
    mongo: {
      uri: process.env.DATABASE_MONGO_URI as string
    }
  },
  name: process.env.NODE_ENV as string,
  port: process.env.PORT || defaultPort
};
