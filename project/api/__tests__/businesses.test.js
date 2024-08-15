const supertest = require("supertest");
const server = require("../../server");
const prisma = require("../../db/index");

describe("/api/businesses", () => {
  const business1 = {
    id: "123",
    name: "first business",
    address: "123 easy st",
    city: "city",
    stars: 2.5,
    reviewCount: 10,
  };
  describe("GET /")
});
