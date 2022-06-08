import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    supportFile: false,
    video: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    // setupNodeEvents(on, config) {}
  }
})
