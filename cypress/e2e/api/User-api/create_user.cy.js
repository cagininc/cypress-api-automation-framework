describe('POST /user - Create New User', () => {
    const user = {
      id: 1,
      username: 'cagin',
      firstName: 'Çağın',
      lastName: 'Tester',
      email: 'cagin@example.com',
      password: '123456',
      phone: '555-1234',
      userStatus: 0
    };
  
    it('should create a new user successfully', () => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/user',
        headers: { 'Content-Type': 'application/json' },
        body: user
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  