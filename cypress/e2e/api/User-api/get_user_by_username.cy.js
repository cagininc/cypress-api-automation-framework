import * as allure from 'allure-js-commons';

describe('GET /user/{username}', () => {
  let createdUsername; 
  beforeEach(()=>{allure.epic('PetStore API Testleri');
    allure.feature('User API Testleri');
    allure.story('Kullanıcı Adı ile Kullanıcı Bilgilerini Getirme');
    allure.severity('normal');
    allure.description('Bu test senaryosu, PetStore API kullanarak önce yeni bir kullanıcı oluşturur ve ardından bu kullanıcının kullanıcı adı ile başarılı bir şekilde çağrılabildiğini ve doğru bilgilerin döndüğünü doğrular.');
});
  before(() => {
    
      const uniqueId = Date.now();
      const userPayload = {
          id: Math.floor(Math.random() * 900000) + 100000,
          username: `cagin_test_user_${uniqueId}`, 
          firstName: 'Cagin',
          lastName: 'Tester',
          email: `cagin.${uniqueId}@example.com`,
          password: '123456',
          phone: '555-1234',
          userStatus: 0
      };

      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/user',
          headers: { 'Content-Type': 'application/json' },
          body: userPayload
      }).then((postRes) => {
          expect(postRes.status).to.eq(200, 'Expected POST to create user to return 200 OK');
          createdUsername = userPayload.username;
          cy.log(`✅ User created successfully with username: ${createdUsername}`);

          
          cy.wait(1000);
          
          cy.request({
              method: 'GET',
              url: `https://petstore.swagger.io/v2/user/${createdUsername}`,
              failOnStatusCode: false 
          }).then(getAfterPostRes => {
              if (getAfterPostRes.status === 200) {
                  cy.log(` User ${createdUsername} successfully verified to exist after POST.`);
                  expect(getAfterPostRes.body.username).to.eq(createdUsername, 'Verified username matches after creation');
              } else {
                  throw new Error(` User ${createdUsername} was not found after creation (Status: ${getAfterPostRes.status}, Body: ${JSON.stringify(getAfterPostRes.body)})`);
              }
          });
      });
  });

  it('should retrieve user details by username', () => {
      cy.allure().severity('normal');
      cy.allure().feature('User');
      cy.allure().story('Retrieve User');

      cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/user/${createdUsername}`,
          failOnStatusCode: false 
      }).then((getRes) => {
          cy.log(`🔍 GET response status for ${createdUsername}: ${getRes.status}`);
          cy.log(`🔍 GET response body for ${createdUsername}: ${JSON.stringify(getRes.body)}`);

          expect(getRes.status).to.eq(200, 'Expected GET request to return 200 OK');
          expect(getRes.body.username).to.eq(createdUsername, 'Expected retrieved username to match the created one');
          expect(getRes.body.firstName).to.eq('Cagin', 'Expected first name to match');
          cy.log(` User ${createdUsername} details successfully retrieved and verified.`);
      });
  });
});