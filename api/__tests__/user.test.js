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
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 200 status code on success", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      console.log(res.body);
      expect(res.status).toBe(200);
    });
    test("deletes password before sending res", async () => {
      const res = await supertest(server)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.body.user).not.toHaveProperty("password");
    });
  });
});
