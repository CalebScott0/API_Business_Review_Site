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
    // Categories: [{ categoryName: "Restaurants" }],
  };
  const testCategory = {
    categoryName: "Restaurants",
    categoryId: "123",
  };

  describe("GET category/:categoryId", () => {
    beforeEach(() => {
      prisma.category.create = jest.fn().mockResolvedValue(testCategory);
      // prisma.categoryToBusiness.create = jest.fn().mockResolvedValue({
      //   categoryName: "ee",
      //   categoryId: "123",
      //   businessId: "123",
      // });
      prisma.business.findMany = jest.fn().mockResolvedValue(business1);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    test("returns business on success", async () => {
      const res = await supertest(server)
        .get
        // `/api/businesses/category/${testCategory.categoryName}`
        ();
      console.log(res.body);
      expect(res.body.business).toMatchObject(business1);
    });
  });
});
