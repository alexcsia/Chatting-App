import type { Config } from "jest";

const config: Config = {
  // Map typescript path aliases to corresponding paths for Jest
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
  },

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
};

export default config;
