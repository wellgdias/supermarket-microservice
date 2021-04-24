module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testResultsProcessor: 'jest-sonar-reporter',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  clearMocks: true,
  setupFiles: ['./jest.setup.js'],
};
