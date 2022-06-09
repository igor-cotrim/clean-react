import { defineConfig } from 'cypress'

const cypressTypeScriptPreprocessor = require('./src/main/test/cypress/cy-ts-preprocessor')

export default defineConfig({
  e2e: {
    fixturesFolder: false,
    supportFile: 'src/main/test/cypress/support/index.js',
    video: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on) {
      on('file:preprocessor', cypressTypeScriptPreprocessor)
    }
  }
})
