import * as allure from 'allure-js-commons';



describe('GET /store/inventory - Inventory by Status', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Store API Testleri');
  allure.story('Sipariş Oluşturma ve Silme Doğrulaması');
  allure.severity('critical');
});
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
  