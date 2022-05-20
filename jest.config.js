// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
}

module.exports = config

// Or async function
module.exports = async () => ({
  verbose: true,
  modulePathIgnorePatterns: ['cypress'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
})
