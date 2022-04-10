/*
 * @Description:
 * @FilePath: /proste-react-use/jest.config.ts
 */
const config = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/**/__tests__/**/useTransiton.test.(ts|tsx)'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@hooks(.*)$': '<rootDir>/src',
  },
};

export default config;
