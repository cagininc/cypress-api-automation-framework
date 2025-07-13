describe('GET /user/login', () => {

        let username 
        before(()=>{
            const userPayload = {
                id: Date.now(),
                username: `cagin ${Date.now()}`,
                firstName: 'Çağın',
                lastName: 'Tester',
                email: 'cagin@example.com',
                password: '123456',
                phone: '555-1234',
                userStatus: 0
              };
              cy.request('POST','https://petstore.swagger.io/v2/user',userPayload)
              .then((res)=>{
                expect(res.status).to.eq(200);
                username=userPayload.username;
              });
    
    
      })

    
    it('should login user with username and password', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/user/login',
        qs: {
          username: username,
          password: '123456'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  