import * as allure from 'allure-js-commons';

describe('DELETE /store/order/{orderId}', () => {
  it('should create an order, attempt to delete it, and verify its state', () => {
    beforeEach(()=>{
    allure.epic('PetStore API Testleri');
    allure.feature('Store API Testleri');
    allure.story('Sipariş Oluşturma ve Silme Doğrulaması');
    allure.severity('critical');

  });
    const newOrder = {
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    };

    let orderId; 
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/store/order',
      headers: { 'Content-Type': 'application/json' },
      body: newOrder
    }).then(postRes => {
      expect(postRes.status).to.eq(200, 'Expected POST request to return 200 OK');
      orderId = postRes.body.id;
      cy.log(`Created Order with ID: ${orderId}`);

      
      cy.request({
        method: 'DELETE',
        url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
        headers: { 'api_key': 'special-key' },
        failOnStatusCode: false 
      }).then(delRes => {
        cy.log(`DELETE response status: ${delRes.status}`);
        
        expect([200, 404, 500]).to.include(delRes.status, 'Expected DELETE to return 200, 404, or 500');

        cy.wait(500);

        cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
          headers: { 'api_key': 'special-key' },
          failOnStatusCode: false 
        }).then(getRes => {
          cy.log(`GET after DELETE response status: ${getRes.status}`);
          
          expect(getRes.status).to.eq(404, 'Expected GET after deletion to return 404 Not Found');

          if (getRes.status === 404) {
            expect(getRes.body.message).to.include('Order not found', 'Expected 404 message to indicate order not found');
          }
        });
      });
    });
  });
});