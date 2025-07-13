describe('GET /store/inventory - Inventory by Status', () => {
    it('should return inventory stats grouped by status', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/store/inventory'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('available');
      });
    });
  });
  