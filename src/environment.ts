const defaultPort = 4000;

export interface Environment {
  port: number | string;
}

export const environment: Environment = {
  port: process.env.PORT || defaultPort
};
