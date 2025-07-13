describe('POST /store/order - Place Order', () => {
    const order = {
      id: 1001,
      petId: 987654321,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    };
  
    it('should place a new order successfully', () => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/store/order',
        headers: { 'Content-Type': 'application/json' },
        body: order
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', order.id);
        expect(response.body.status).to.eq('placed');
      });
    });
  });
  