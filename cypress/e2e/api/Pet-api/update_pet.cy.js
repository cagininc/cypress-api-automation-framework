describe('PUT /pet - Update an existing pet', () => {
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
  