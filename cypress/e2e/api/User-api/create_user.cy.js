import * as allure from 'allure-js-commons';

describe('POST /user - Create New User', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Store API Testleri');
  allure.story('Sipariş Oluşturma ve Silme Doğrulaması');
  allure.severity('critical');
  allure.description('Bu test senaryosu, PetStore API kullanarak önce yeni bir sipariş oluşturur, ardından bu siparişi siler ve silme işleminin başarılı olup olmadığını GET isteği ile doğrular.');
});
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
  