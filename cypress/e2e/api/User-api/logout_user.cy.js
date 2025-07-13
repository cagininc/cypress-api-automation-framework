describe('GET /user/logout', () => {
    it('should logout the current user session', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/user/logout'
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  