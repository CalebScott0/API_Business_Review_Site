const supertest = require("supertest");
const server = require("../../server");
const prisma = require("../../db/index");
const bcrypt = require("bcrypt");

describe("/api/user", () => {
  describe("GET /", () => {
    const user = {
      id: "123",
      username: "username",
      password: "hashPass",
      Reviews: [{ id: "1", text: "text", stars: 2, userId: "123" }],
    };
    let token;

    beforeEach(async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      //   log in
      const res = await supertest(server).post("/api/auth/login").send(user);

      token = res.body.token;
      prisma.user.update = jest
        .fn()
        .mockResolvedValue({ ...user, stars: 2, reviewCount: 1 });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns user object on success", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.body.user).toMatchObject({
        id: "123",
        username: "username",
        Reviews: [{ id: "1", text: "text", stars: 2, userId: "123" }],
        stars: 2,
        reviewCount: 1,
      });
    });

    test("returns 200 status code on success", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    test("deletes password before sending res", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.body.user).not.toHaveProperty("password");
    });

    test("returns 400 status code with bad token", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${123}`);
      expect(res.status).toBe(400);
    });

    test("returns error message with bad token", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${123}`);
      expect(res.body.message).toEqual("Authorization Token Malformed");
    });

    test("returns 400 status code with no Bearer in header", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(400);
    });

    test("returns error message with no Bearer in header", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `${token}`);
      expect(res.body.message).toEqual(
        "Authorization token must start with Bearer "
      );
    });
  });
});
