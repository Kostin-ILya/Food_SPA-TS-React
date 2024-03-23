/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx, ts,tsx}',
    '!src/**/index.tsx',
    '!src/main.jsx',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.scss$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>/src'],
}

export default config
