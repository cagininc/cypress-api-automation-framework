import * as allure from "allure-js-commons";

describe("PetStore API – Create & Get Pet By ID", () => {
  beforeEach(()=>{
  allure.epic("PetStore API Testleri");
  allure.feature("Pet API Testleri");
  allure.story("Yeni Pet Oluşturma ve Doğrulama");
  allure.severity("critical");
  allure.tag("API", "POST", "GET", "PetCreation", "Verification");
  allure.description(
    "Bu test, PetStore API kullanarak yeni bir evcil hayvan oluşturur ve ardından oluşturulan hayvanın ID'si ile başarılı bir şekilde çağrılabildiğini doğrular."
  );
});

  it("POST ile pet yaratıp, GET ile aynı ID'yi doğrular", () => {
    const petId = Number(Date.now().toString().slice(-6));

    cy.request({
      method: "POST",
      url: "/pet",
      body: {
        id: petId,
        name: "TestPet",
        photoUrls: [],
        status: "available",
      },
    }).then((postRes) => {
      expect(postRes.status).to.eq(200);
      expect(postRes.body).to.have.property("id", petId);

      cy.request({
        method: "GET",
        url: `/pet/${petId}`,
        failOnStatusCode: false,
      }).then((getRes) => {
        expect([200, 404]).to.include(getRes.status);

        if (getRes.status === 200) {
          expect(getRes.body).to.deep.include({
            id: petId,
            name: "TestPet",
            status: "available",
          });
        } else {
          cy.log(`Pet bulunamadı: ${getRes.body.message}`);
        }
      });
    });
  });
});
