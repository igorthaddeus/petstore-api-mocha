const { expect } = require("chai");
const PetAPI = require("../apis/baseAPi");

const api = new PetAPI("https://petstore.swagger.io/v2");

describe("GET /pet/findByStatus", () => {
    it("Verify that the API returns pets with status 'available'", async () => {
        const res = await api.findByStatus("available");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");

        res.body.forEach((pet) => {
            expect(pet.status).to.equal("available");
        });
    });

    it("Verify that the API returns pets with status 'pending'", async () => {
        const res = await api.findByStatus("pending");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");

        res.body.forEach((pet) => {
            expect(pet.status).to.equal("pending");
        });
    });

    it("Verify that the API returns pets with status 'sold'", async () => {
        const res = await api.findByStatus("sold");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");

        res.body.forEach((pet) => {
            expect(pet.status).to.equal("sold");
        });
    });

    it("Verify that the API returns an error when status is invalid", async () => {
        const res = await api.findByStatus("random");

        expect(res.status).to.equal(400);
    });

    it("Verify that the API is case sensitive for status value", async () => {
        const res = await api.findByStatus("PENDING");

        expect(res.status).to.equal(400);
    });
});
