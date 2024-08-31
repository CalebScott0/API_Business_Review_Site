const supertest = require("supertest");
const server = require("../../server");
const prisma = require("../../db/index");

describe("/api/businesses", () => {
  const business1 = {
    id: "123ABC",
    name: "first business",
    address: "123 easy st",
    city: "city",
    stars: 2.5,
    reviewCount: 10,
    // Categories: [
    //   { categoryName: "category", categoryId: "123", businessId: "123" },
    // ],
  };
  describe("GET category/:categoryId", () => {
    beforeEach(() => {
      prisma.category.create = jest.fn().mockResolvedValue({id: "123", name: "category"})
      prisma.categoryToBusiness.create = jest.fn().mockResolvedValue({
        categoryName: "category",
        categoryId: "123",
        businessId: "123",
      });
    });
    test("returns business on success", async () => {
      prisma.business.findMany = jest.fn().mockResolvedValue(business1);

      const res = await supertest(server).get("/api/businesses/category/123 ");
      expect(res.body).toMatchObject(business1);
    });
  });
});
