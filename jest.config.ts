/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/src/.*(test|spec))\\.tsx?$',
  globalSetup: '<rootDir>/testSetup.ts'
};
