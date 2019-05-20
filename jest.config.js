module.exports = {
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/graphql.d.ts',
    './src/main.ts',
    './src/mongoose-connection.ts',
    './src/apollo-server.ts',
    './src/environment.ts',
    './src/app/app.module.ts'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest'
  }
};
