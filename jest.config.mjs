import nextJest from 'next/jest.js';
import { defaults } from 'jest-config';
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // isolatedModules: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // setupFiles: ['./jest.polyfills.js'],
  // testEnvironmentOptions: {
  //   customExportConditions: [''],
  // },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)', '**/__tests__/**/*.[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '\\\\node_modules\\\\',
    '\\.pnp\\.[^\\\\]+$',
    '/node_modules/',
    '.pnp.[^/]+$',
  ],
};

export default createJestConfig(customJestConfig);
