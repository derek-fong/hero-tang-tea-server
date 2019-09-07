function getCorsOrigins(origins: string | undefined): string[] {
  return origins
    ? origins.split(',').map((origin: string): string => origin.trim())
    : [];
}

const defaultPort = 4000;

export interface Environment {
  apollo: {
    engine: {
      apiKey: string;
      endpointUrl: string;
      schemaTag: string;
    };
    server: {
      cors: {
        origins: string[];
      };
      introspection: boolean;
      playground: boolean;
      voyager: {
        endpointUrl: string | undefined;
      };
    };
  };
  auth: {
    jwks: {
      cache: boolean;
      rateLimit: boolean;
      requestPerMinute: number;
      uri: string;
    };
    jwt: {
      audience: string;
      issuer: string;
    };
  };
  dataStores: {
    mongoDb: {
      uri: string;
    };
  };

  name: string;
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    engine: {
      apiKey: process.env.APOLLO_ENGINE_API_KEY as string,
      endpointUrl: process.env.APOLLO_ENGINE_ENDPOINT_URL as string,
      schemaTag: process.env.APOLLO_ENGINE_SCHEMA_TAG as string,
    },
    server: {
      cors: {
        origins: getCorsOrigins(process.env.APOLLO_SERVER_CORS_ORIGINS),
      },
      introspection: process.env.APOLLO_SERVER_INTROSPECTION === 'true',
      playground: process.env.APOLLO_SERVER_PLAYGROUND === 'true',
      voyager: {
        endpointUrl: process.env.APOLLO_SERVER_VOYAGER_ENDPOINT_URL,
      },
    },
  },
  auth: {
    jwks: {
      cache: process.env.AUTH_JWKS_CACHE === 'true',
      rateLimit: process.env.AUTH_JWKS_RATE_LIMIT === 'true',
      requestPerMinute: parseInt(
        process.env.AUTH_JWKS_REQUEST_PER_MINUTE as string,
        10
      ),
      uri: process.env.AUTH_JWKS_URI as string,
    },
    jwt: {
      audience: process.env.AUTH_JWT_AUDIENCE as string,
      issuer: process.env.AUTH_JWT_ISSUER as string,
    },
  },
  dataStores: {
    mongoDb: {
      uri: process.env.DATASTORES_MONGODB_URI as string,
    },
  },
  name: process.env.NODE_ENV as string,
  port: process.env.PORT || defaultPort,
};
