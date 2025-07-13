describe('GET /pet/{petId} - Find Pet By ID', () => {
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
