const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const { paths } = compilerOptions;

// remove unwanted paths
delete paths['*'];

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(paths),
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
};
