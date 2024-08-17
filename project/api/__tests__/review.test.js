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

//   describe("POST /:reviewId", () => {
//     beforeEach(async () => {
//       prisma.user.findUnique = jest.fn().mockResolvedValue(testUser);

//       bcrypt.compare = jest.fn().mockResolvedValue(true);

//       const res = await supertest(server)
//         .post("/api/auth/login")
//         .send(testUser);
//       token = res.body.token;
//       prisma.business.update = jest
//         .fn()
//         .mockResolvedValue({ ...testBusiness, reviewCount: 1, stars: 2 });
//       prisma.user.update = jest
//         .fn()
//         .mockResolvedValue({ ...testUser, reviewCount: 1, stars: 2 });
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     test("returns review on success", async () => {
//       prisma.review.create = jest.fn().mockResolvedValue(testReview);

//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send(testReview);

//       expect(res.body.review).toMatchObject(testReview);
//     }, 20000);
//     // timeout set to 20 seconds
//     test("returns 201 status code on success", async () => {
//       prisma.review.create = jest.fn().mockResolvedValue(testReview);

//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send(testReview);
//       expect(res.status).toBe(201);
//     }, 20000);

//     test("returns 400 status code with bad data", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ ...testReview, text: "" });
//       expect(res.status).toBe(400);
//     }, 20000);

//     test("returns error message with bad data", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ ...testReview, text: "" });
//       expect(res.body.message).toBe(
//         "Please provide text and a stars rating (1-5) for review"
//       );
//     }, 20000);

//     test("returns 409 status if user already has review on business", async () => {
//       prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);

//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send(testReview);
//       expect(res.status).toBe(409);
//     }, 20000);

//     test("returns error message if user already has review on business", async () => {
//       prisma.review.findUnique = jest.fn().mockResolvedValue(testReview);

//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${token}`)
//         .send(testReview);
//       expect(res.body.message).toBe(
//         "User already has review for this business"
//       );
//     }, 20000);

//     test("returns 500 status code with wrong token", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${"abc"}`)
//         .send(testReview);
//       expect(res.status).toBe(500);
//     }, 20000);

//     test("returns error message with wrong token", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bearer ${"abc"}`)
//         .send(testReview);
//       expect(res.body.error.message).toBe("jwt malformed");
//     }, 20000);

//     test("returns 400 status code with wrong header", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bear ${"token"}`)
//         .send(testReview);
//       expect(res.status).toBe(400);
//     }, 20000);

//     test("returns error message with wrong header", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .set("Authorization", `Bear ${"token"}`)
//         .send(testReview);
//       expect(res.body.message).toBe(
//         "Authorization token must start with Bearer "
//       );
//     }, 20000);

//     test("returns 401 status code if user is not logged in", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .send(testReview);
//       expect(res.status).toBe(401);
//     }, 20000);

//     test("returns error message if user is not logged in", async () => {
//       const res = await supertest(server)
//         .post("/api/review/1234")
//         .send(testReview);
//       expect(res.body.message).toBe("You must be logged in to do that");
//     }, 20000);
//   });
});
