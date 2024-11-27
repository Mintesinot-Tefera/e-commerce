module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    globalTeardown: '<rootDir>/tests/teardown.js',
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  };
  