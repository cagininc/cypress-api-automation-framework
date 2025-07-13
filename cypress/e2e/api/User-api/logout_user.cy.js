import * as allure from 'allure-js-commons';

describe('GET /user/logout', () => {
  beforeEach(()=>{allure.epic('PetStore API Testleri');
    allure.feature('User API Testleri');
    allure.story('Kullanıcı oturumundan  çıkış');
    allure.severity('blocker');
    allure.description('Bu test senaryosu, PetStore API kullanarak aktif kullanıcı oturumundan çıkış işlemini doğrular.');})
  
          it('should logout the current user session', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/user/logout'
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  