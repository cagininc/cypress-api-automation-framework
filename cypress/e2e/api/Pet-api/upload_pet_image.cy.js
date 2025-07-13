
describe('POST /pet/{petId}/uploadImage - Upload Pet Image', () => {
  let petId;

  before(() => {
    const pet = {
      name: 'ImageTestPet',
      category: { id: 1, name: 'Cats' },
      photoUrls: [],
      tags: [{ id: 1, name: 'tekir' }],
      status: 'available'
    };

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: {
        'Content-Type': 'application/json',
        'api_key': 'special-key'
      },
      body: pet
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id');
      petId = res.body.id;
    });
  });

  it('evcil hayvan için bir görsel başarıyla yüklenmelidir', () => {
    cy.allure().severity('critical');
    cy.allure().feature('Pet');
    cy.allure().story('Upload Pet Image');

    cy.fixture('fixtures/dog.png', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileBlob) => {
        cy.request({
          method: 'POST',
          url: `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`,
          headers: {
            'api_key': 'special-key'
          },
          body: {
            file: fileBlob,
            additionalMetadata: 'test image upload'
          },
          form: true,
          failOnStatusCode: false
        }).then((uploadRes) => {
          expect(uploadRes.status).to.eq(200);
          expect(uploadRes.body).to.have.property('message');
          expect(uploadRes.body.message).to.include('.jpg');
        });
      });
  });
});
