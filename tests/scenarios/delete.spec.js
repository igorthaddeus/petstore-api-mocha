const { expect } = require("chai");
const PetAPI = require("../apis/baseAPi");

const api = new PetAPI("https://petstore.swagger.io/v2");

describe("DELETE /pet", () => {
    let petId = 999999;

    before(async () => {
        await api.createPet({
            id: petId,
            name: "Buddy",
            photoUrls: ["https://example.com/dog.jpg"],
            status: "available",
        });
    });

    it("Verify that the API deletes pet successfully with valid petId", async () => {
        const res = await api.deletePet(petId);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(String(petId));
    });

    it("Verify that the API returns error when petId does not exist", async () => {
        const res = await api.deletePet(123456789);

        expect(res.status).to.equal(404);
    });

    it("Verify that the API returns error when petId is invalid", async () => {
        const res = await api.deletePet("abc");

        expect(res.status).to.equal(400);
    });
});
