module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    window: {
      open: () => {},
      location: ''
    }
  }
};