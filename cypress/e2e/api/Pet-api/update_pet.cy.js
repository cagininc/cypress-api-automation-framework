
import * as allure from 'allure-js-commons';

describe('PUT /pet - Update an existing pet', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Pet API Testleri');
  allure.story('ID ile Evcil Hayvan Bilgilerini Getirme');
  allure.severity('critical');
  allure.tag('API', 'GET', 'POST', 'PetRetrieval', 'Verification');
  allure.description('Bu test senaryosu, PetStore API kullanarak önce yeni bir evcil hayvan oluşturur ve ardından bu hayvanın ID\'si ile başarılı bir şekilde çağrılabildiğini ve doğru bilgilerin döndüğünü doğrular.');
})
    const updatedPet = {
      id: 987654321,
      name: 'Bobby Happy',
      category: { id: 1, name: 'Dogs' },
      photoUrls: ['https://example.com/image.jpg'],
      tags: [{ id: 1, name: 'friendly' }],
      status: 'sold'
    };
  
    it('should update the pet details successfully', () => {
      cy.request({
        method: 'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: updatedPet,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'Bobby Happy');
        expect(response.body.status).to.eq('sold');
      });
    });
  });
  