import type { Config } from "jest";

const config: Config = {
  // Map typescript path aliases to corresponding paths for Jest
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
  },

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
