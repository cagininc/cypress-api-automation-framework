// cypress/e2e/api/User-api/get_user.cy.js

describe('GET /user/{username}', () => {
  let createdUsername; // Declare a variable to store the dynamically generated username

  before(() => {
      // Generate a unique username WITHOUT spaces to avoid URL encoding issues
      const uniqueId = Date.now();
      const userPayload = {
          id: Math.floor(Math.random() * 900000) + 100000,
          username: `cagin_test_user_${uniqueId}`, // Ensures URL-safe username
          firstName: 'Cagin',
          lastName: 'Tester',
          email: `cagin.${uniqueId}@example.com`,
          password: '123456',
          phone: '555-1234',
          userStatus: 0
      };

      // Step 1: Create a user before running the GET test
      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/user',
          headers: { 'Content-Type': 'application/json' },
          body: userPayload
      }).then((postRes) => {
          expect(postRes.status).to.eq(200, 'Expected POST to create user to return 200 OK');
          createdUsername = userPayload.username;
          cy.log(`✅ User created successfully with username: ${createdUsername}`);

          // Add a short wait here to allow the API to persist the user
          // This is a common workaround for flaky public APIs
          cy.wait(1000); // Wait for 1 second (adjust as needed, 500ms-2000ms usually works)

          // Step 1.5: Verify user existence immediately after creation for robustness
          cy.request({
              method: 'GET',
              url: `https://petstore.swagger.io/v2/user/${createdUsername}`,
              failOnStatusCode: false // Don't fail immediately, allows checking 404 if creation failed silently
          }).then(getAfterPostRes => {
              if (getAfterPostRes.status === 200) {
                  cy.log(`✅ User ${createdUsername} successfully verified to exist after POST.`);
                  expect(getAfterPostRes.body.username).to.eq(createdUsername, 'Verified username matches after creation');
              } else {
                  // If the user isn't found right after creation, throw an error
                  throw new Error(`❌ User ${createdUsername} was not found after creation (Status: ${getAfterPostRes.status}, Body: ${JSON.stringify(getAfterPostRes.body)})`);
              }
          });
      });
  });

  it('should retrieve user details by username', () => {
      cy.allure().severity('normal');
      cy.allure().feature('User');
      cy.allure().story('Retrieve User');

      cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/user/${createdUsername}`,
          failOnStatusCode: false 
      }).then((getRes) => {
          cy.log(`🔍 GET response status for ${createdUsername}: ${getRes.status}`);
          cy.log(`🔍 GET response body for ${createdUsername}: ${JSON.stringify(getRes.body)}`);

          expect(getRes.status).to.eq(200, 'Expected GET request to return 200 OK');
          expect(getRes.body.username).to.eq(createdUsername, 'Expected retrieved username to match the created one');
          expect(getRes.body.firstName).to.eq('Cagin', 'Expected first name to match');
          cy.log(`✅ User ${createdUsername} details successfully retrieved and verified.`);
      });
  });
});