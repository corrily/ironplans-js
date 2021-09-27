/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coverageDirectory: '<rootDir>/coverage',
  projects: ['<rootDir>/packages/*/jest.config.js'],
}
