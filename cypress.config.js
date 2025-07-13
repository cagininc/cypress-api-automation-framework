const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter'); 
module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {

      
      allureCypress(on, config);

      

      return config; 
    },

    baseUrl: 'https://petstore.swagger.io/v2',
    specPattern: 'cypress/e2e/api/**/*.cy.{js,jsx,ts,tsx}',
  },
});