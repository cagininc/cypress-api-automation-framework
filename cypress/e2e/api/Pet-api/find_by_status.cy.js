describe('GET /pet/findByStatus - Find Available Pets', () => {
    it('should return a list of available pets', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/findByStatus',
        qs: { status: 'available' }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        if (response.body.length > 0) {
          expect(response.body[0]).to.have.property('status', 'available');
        }
      });
    });
  });
  