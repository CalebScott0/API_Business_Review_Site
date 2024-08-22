const server = require("../../server");
const prisma = require("../../db/index");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

describe("/api/review", () => {
  // global variables
  let token;
  const testUser = {
    id: "123",
    username: "username",
    password: "password",
  };

  const testBusiness = {
    id: "321",
    name: "business",
    address: "abc street",
    city: "vegas",
  };

  const testReview = {
    id: "1234",
    text: "test",
    stars: 2,
    authorId: "123",
    businessId: "321",
  };

  // describe("POST /:businessId", () => {
  //   beforeEach(async () => {
  //     prisma.user.findUnique = jest.fn().mockResolvedValue(testUser);

  //     bcrypt.compare = jest.fn().mockResolvedValue(true);

  //     const res = await supertest(server)
  //       .post("/api/auth/login")
  //       .send(testUser);
  //     token = res.body.token;
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, reviewCount: 1, stars: 2 });
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, reviewCount: 1, stars: 2 });
  //   });

  //   afterEach(() => {
  //     jest.clearAllMocks();
  //   });

  //   test("returns review on success", async () => {
  //     prisma.review.create = jest.fn().mockResolvedValue(testReview);

  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(testReview);

  //     expect(res.body.review).toMatchObject(testReview);
  //   }, 20000);
  //   // timeout set to 20 seconds
  //   test("returns 201 status code on success", async () => {
  //     prisma.review.create = jest.fn().mockResolvedValue(testReview);

  //     const res = await supertest(server)
  //       .post("/api/review/321")
  // .set("Authorization", `Bearer ${token}`)
  //       .send(testReview);
  //     expect(res.status).toBe(201);
  //   }, 20000);

  //   test("returns 400 status code with bad data", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, text: "" });
  //     expect(res.status).toBe(400);
  //   }, 20000);

  //   test("returns error message with bad data", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, text: "" });
  //     expect(res.body.message).toEqual(
  //       "Please provide text and a stars rating (1-5) for review"
  //     );
  //   }, 20000);

  //   test("returns 409 status if user already has review on business", async () => {
  //     prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);

  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(testReview);
  //     expect(res.status).toBe(409);
  //   }, 20000);

  //   test("returns error message if user already has review on business", async () => {
  //     prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);

  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(testReview);
  //     expect(res.body.message).toEqual(
  //       "User already has review for this business"
  //     );
  //   }, 20000);

  //   test("returns 400 status code with wrong token", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${"abc"}`)
  //       .send(testReview);
  //     expect(res.status).toBe(400);
  //   }, 20000);

  //   test("returns error message with wrong token", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bearer ${"abc"}`)
  //       .send(testReview);
  //     expect(res.body.message).toEqual("Authorization Token Malformed");
  //   }, 20000);

  //   test("returns 400 status code with wrong header", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bear ${token}`)
  //       .send(testReview);
  //     expect(res.status).toBe(400);
  //   }, 20000);

  //   test("returns error message with wrong header", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .set("Authorization", `Bear ${token}`)
  //       .send(testReview);
  //     expect(res.body.message).toEqual(
  //       "Authorization token must start with Bearer "
  //     );
  //   }, 20000);

  //   test("returns 401 status code if user is not logged in", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .send(testReview);
  //     expect(res.status).toBe(401);
  //   }, 20000);

  //   test("returns error message if user is not logged in", async () => {
  //     const res = await supertest(server)
  //       .post("/api/review/321")
  //       .send(testReview);
  //     expect(res.body.message).toEqual("You must be logged in to do that");
  //   }, 20000);
  // });

  // describe("PUT /:reviewId", () => {
  //   beforeEach(async () => {
  //     prisma.user.findUnique = jest.fn().mockResolvedValue(testUser);

  //     bcrypt.compare = jest.fn().mockResolvedValue(true);

  //     const res = await supertest(server)
  //       .post("/api/auth/login")
  //       .send(testUser);
  //     token = res.body.token;
  //     prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);
  //   });

  //   afterEach(() => {
  //     jest.clearAllMocks();
  //   });

  //   test("returns updated review on success", async () => {
  //     const updatedReview = { ...testReview, stars: 4 };
  //     prisma.review.update = jest.fn().mockResolvedValue(updatedReview);
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, stars: 4 });
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, stars: 4 });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, stars: 4 });
  //     expect(res.body.review).toMatchObject(updatedReview);
  //   }, 20000);

  //   test("returns 200 status code on success", async () => {
  //     const updatedReview = { ...testReview, stars: 4 };
  //     prisma.review.update = jest.fn().mockResolvedValue(updatedReview);
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, stars: 4 });
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, stars: 4 });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, stars: 4 });
  //     expect(res.status).toBe(200);
  //   }, 20000);

  //   test("returns 400 status code if user is not the author", async () => {
  //     prisma.review.findUnique = jest
  //       .fn()
  //       .mockResolvedValue({ ...testReview, authorId: "1" });
  //     const updatedReview = { ...testReview, stars: 4 };
  //     prisma.review.update = jest.fn().mockResolvedValue(updatedReview);
  //     prisma.user.update = jest.fn().mockResolvedValue({ ...testUser });
  //     prisma.business.update = jest.fn().mockResolvedValue({ ...testBusiness });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, stars: 4 });
  //     expect(res.status).toBe(400);
  //   }, 20000);

  //   test("returns error message if user is not the author", async () => {
  //     prisma.review.findUnique = jest
  //       .fn()
  //       .mockResolvedValue({ ...testReview, authorId: "1" });
  //     const updatedReview = { ...testReview, stars: 4 };
  //     prisma.review.update = jest.fn().mockResolvedValue(updatedReview);
  //     prisma.user.update = jest.fn().mockResolvedValue({ ...testUser });
  //     prisma.business.update = jest.fn().mockResolvedValue({ ...testBusiness });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, stars: 4 });
  //     expect(res.body.message).toEqual("User is not the author of this review");
  //   }, 20000);

  //   test("returns 400 status code if no data is sent to update", async () => {
  //     prisma.review.update = jest.fn().mockResolvedValue(null);
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, stars: 4 });
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, stars: 4 });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ testReview });
  //     expect(res.status).toBe(400);
  //   }, 20000);

  //   test("returns error message if no data is sent to update", async () => {
  //     prisma.review.update = jest.fn().mockResolvedValue(null);
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, stars: 4 });
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, stars: 4 });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ testReview });
  //     expect(res.body.message).toEqual(
  //       "Please update the text or stars rating (1-5) for review"
  //     );
  //   }, 20000);

  //   test("prisma.review.update is called", async () => {
  //     const updatedReview = { ...testReview, stars: 4 };
  //     prisma.review.update = jest.fn().mockResolvedValue(updatedReview);
  //     prisma.user.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testUser, stars: 4 });
  //     prisma.business.update = jest
  //       .fn()
  //       .mockResolvedValue({ ...testBusiness, stars: 4 });
  //     const res = await supertest(server)
  //       .put("/api/review/1234")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...testReview, stars: 4 });
  //     expect(prisma.review.update).toHaveBeenCalled();
  //   }, 20000);
  // });

  describe("DELETE /:reviewId", () => {
    beforeEach(async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(testUser);

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);
      token = res.body.token;
      prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 204 status code on success", async () => {
      prisma.review.delete = jest.fn().mockResolvedValue(testReview);
      console.log(token);

      const res = await supertest(server)
        .delete("/api/review/1234")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);
    });
  });
});
