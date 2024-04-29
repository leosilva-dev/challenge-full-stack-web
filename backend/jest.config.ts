import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  // dir: '.',
  moduleDirectories: ['node_modules', 'src'],
  roots: ['src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
  },
};

export default config;
