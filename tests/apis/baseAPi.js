const request = require("supertest");

class PetAPI {
    constructor(baseUrl) {
        this.request = request(baseUrl);
    }

    async createPet(payload) {
        return this.request.post("/pet").set("Content-Type", "application/json").send(payload);
    }

    async findByStatus(status) {
        return this.request.get("/pet/findByStatus").query({ status });
    }

    async deletePet(petId) {
        return this.request.delete(`/pet/${petId}`);
    }
}

module.exports = PetAPI;
