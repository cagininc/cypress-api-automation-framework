import * as allure from 'allure-js-commons';

describe('POST /store/order - Place Order', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Store API Testleri');
  allure.story('Yeni Sipariş Oluşturma');
  allure.severity('blocker');
  allure.description('Bu test senaryosu, PetStore API kullanarak yeni bir sipariş oluşturur ve siparişin başarılı bir şekilde yerleştirildiğini doğrular.');
})
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
  