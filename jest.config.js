module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  globals: {
    window: {
      open: () => {},
      location: ''
    }
  }
};