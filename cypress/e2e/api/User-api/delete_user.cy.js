describe('DELETE /user/{username} - Create & Delete User with retry GET', () => {
  const userId = Date.now();
  const username = `cagin_user_${userId}`;
  const userPayload = {
    id: userId,
    username: username,
    firstName: 'Cagin',
    lastName: 'Tester',
    email: `cagin.${userId}@example.com`,
    password: 'password123',
    phone: '555-123-4567',
    userStatus: 0
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      headers: { 'Content-Type': 'application/json' },
      body: userPayload
    }).then((postRes) => {
      expect(postRes.status).to.eq(200);
      cy.log(`User ${username} created.`);
    });
  });

  it('should delete the user and verify deletion with retries', () => {
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/user/${username}`,
      headers: { 'api_key': 'special-key' },
      failOnStatusCode: false
    }).then((delRes) => {
      expect([200, 404]).to.include(delRes.status);
      cy.log(`DELETE status: ${delRes.status}`);

      const maxRetries = 3;
      let attempt = 0;

      function checkUserDeleted() {
        attempt++;
        cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/user/${username}`,
          headers: { 'api_key': 'special-key' },
          failOnStatusCode: false
        }).then((getRes) => {
          cy.log(`GET attempt ${attempt}, status: ${getRes.status}`);

          if (getRes.status === 404) {
            expect(getRes.body.message.toLowerCase()).to.include('not found');
            cy.log(`User ${username} confirmed deleted.`);
          } else if (attempt < maxRetries) {
            cy.wait(500).then(checkUserDeleted);
          } else {
            throw new Error(`User still exists after ${maxRetries} attempts: ${JSON.stringify(getRes.body)}`);
          }
        });
      }

      checkUserDeleted();
    });
  });
});
