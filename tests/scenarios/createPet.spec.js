const { expect } = require("chai");
const PetAPI = require("../apis/baseAPi");

const api = new PetAPI("https://petstore.swagger.io/v2");

describe("Create Pet", () => {
    it("Verify API creates pet successfully with valid payload", async () => {
        const payload = {
            id: 123456,
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "Valid payload should return 200").to.equal(200);
        expect(res.body.name).to.equal(payload.name);
    });

    it("Verify API returns error when required field 'name' is missing", async () => {
        const payload = {
            id: 13245,
            category: { id: 1, name: "Dogs" },
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "Name is required").to.equal(400);
    });

    it("Verify API returns error when required field 'photoUrls' is missing", async () => {
        const payload = {
            id: "72638067",
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "photoUrls is required").to.equal(400);
    });

    it("Verify API returns error when pet ID already exists", async () => {
        const payload = {
            id: 72638067,
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        await api.createPet(payload);
        const res = await api.createPet(payload);

        expect(res.status, "Duplicate ID should be rejected").to.equal(400);
    });

    it("Verify API returns error when ID is not integer", async () => {
        const payload = {
            id: "72638067",
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "ID must be integer").to.equal(400);
    });

    it("Verify API returns error when photoUrls format is invalid", async () => {
        const payload = {
            id: "123232",
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["photo.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "photoUrls must be valid URL").to.equal(400);
    });

    it("Verify API returns error when photoUrls is empty", async () => {
        const payload = {
            id: 13246,
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: [],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "photoUrls cannot be empty").to.equal(400);
    });

    it("Verify API returns error when status value is invalid", async () => {
        const payload = {
            id: "19928",
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "not found",
        };

        const res = await api.createPet(payload);

        expect(res.status, "Invalid status value").to.equal(400);
    });

    it("Verify API accepts valid status values", async () => {
        const payload = {
            id: "12928",
            category: { id: 1, name: "Dogs" },
            name: "Buddy",
            photoUrls: ["https://example.com/dog1.jpg"],
            tags: [{ id: 1, name: "friendly" }],
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "Valid status should return 200").to.equal(200);
        expect(res.body.status).to.equal("available");
    });

    it("Verify API returns error when payload structure is invalid", async () => {
        const payload = {
            id: 12928,
            category: "Dogs",
            name: "Buddy",
            photoUrls: "https://example.com/dog1.jpg",
            status: "available",
        };

        const res = await api.createPet(payload);

        expect(res.status, "Invalid payload structure").to.equal(400);
    });

});