exports = {
  coverageDirectory: "coverage",
  testEnvironment: "node",
  coverageProvider: "babel",
  collectCoverageFrom: ["**/src/**/*.js", "!**/src/main/**"],
  preset: "@shelf/jest-mongodb",
};
