module.exports = {
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/main.ts',
    './src/apollo-server.ts',
    './src/environment.ts',
    './src/schema.ts'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node'
};
