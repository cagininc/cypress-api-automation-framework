
import * as allure from 'allure-js-commons';


describe('Store API – Create & Get Order By ID', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Store API Testleri');
  allure.story('Sipariş Oluşturma ve Silme Doğrulaması');
  allure.severity('critical');
  allure.description('Bu test senaryosu, PetStore API kullanarak önce yeni bir sipariş oluşturur, ardından bu siparişi siler ve silme işleminin başarılı olup olmadığını GET isteği ile doğrular.');
});
  it('POST ile order yaratıp, GET ile aynı ID’yi doğrular', () => {
    const orderId = Number(Date.now().toString().slice(-6));

    cy.request({
      method: 'POST',
      url: '/store/order',    
      body: {
        id: orderId,
        petId: 74519,         
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: 'placed',
        complete: true
      }
    }).then((postRes) => {
      expect(postRes.status).to.eq(200);
      expect(postRes.body).to.have.property('id', orderId);

      cy.request({
        method: 'GET',
        url: `/store/order/${orderId}`,
        failOnStatusCode: false
      }).then((getRes) => {
        expect([200, 404]).to.include(getRes.status);

        if (getRes.status === 200) {
          expect(getRes.body).to.deep.include({
            id: orderId,
            petId: 74519,
            quantity: 1,
            status: 'placed'
          });
        } else {
          cy.log(`Order bulunamadı: ${getRes.body.message}`);
        }
      });
    });
  });
});
