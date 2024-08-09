const supertest = require("supertest");
const server = require("../../server");
const prisma = require("../../db/index");
const bcrypt = require("bcrypt");

describe("/api/auth", () => {
  describe("POST /register", () => {
    const user = {
      username: "username",
      password: "password",
    };

    beforeEach(() => {
      prisma.user.create = jest
        .fn()
        .mockResolvedValue({ ...user, id: "123", password: "hashpass" });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 201 status on success", async () => {
      const res = await supertest(server).post("/api/auth/register").send(user);

      expect(res.status).toBe(201);
    });

    test("returns token on success", async () => {
      const res = await supertest(server).post("/api/auth/register").send(user);

      expect(res.body.token).toBeTruthy();
    });
    test("prisma.user.create is called", async () => {
      await supertest(server).post("/api/auth/register").send(user);

      expect(prisma.user.create).toHaveBeenCalled();
    });

    test("returns 400 status if data is missing", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ ...user, username: "" });

      expect(res.status).toBe(400);
    });
  });
});
