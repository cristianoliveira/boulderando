// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
}

module.exports = config

// Or async function
module.exports = async () => ({
  testEnvironment: "jsdom",
  verbose: true,
  modulePathIgnorePatterns: ['cypress'],
  // Ingore nextjs generated files
  testMatch: [ "**/__tests__/**/*.spec.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  // collectCoverage: true,
  collectCoverageFrom: ['src/**/*.spec.{js,jsx,ts,tsx}'],
})
