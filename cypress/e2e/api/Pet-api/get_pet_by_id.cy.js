import * as allure from 'allure-js-commons';


describe('GET /pet/{petId} - Find Pet By ID', () => {
  beforeEach(()=>{
  allure.epic('PetStore API Testleri');
  allure.feature('Pet API Testleri');
  allure.story('ID ile Evcil Hayvan Bilgilerini Getirme');
  allure.severity('critical');
  allure.tag('API', 'GET', 'POST', 'PetRetrieval', 'Verification');
  allure.description('Bu test senaryosu, PetStore API kullanarak önce yeni bir evcil hayvan oluşturur ve ardından bu hayvanın ID\'si ile başarılı bir şekilde çağrılabildiğini ve doğru bilgilerin döndüğünü doğrular.');
});
  it('should create a pet and retrieve it by ID', () => {
    const petId = Number(Date.now().toString().slice(-6)); 
    cy.request({
      method: 'POST',
      url: '/pet',
      body: {
        id: petId,
        name: 'TestPet',
        photoUrls: [],
        status: 'available'
      }
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200);
      expect(postResponse.body.id).to.eq(petId);

      cy.request({
        method: 'GET',
        url: `/pet/${petId}`
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.id).to.eq(petId);
        expect(getResponse.body.name).to.eq('TestPet');
        expect(getResponse.body.status).to.eq('available');
      });
    });
  });
});
