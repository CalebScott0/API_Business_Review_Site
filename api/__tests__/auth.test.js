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
    test("returns error message if data is missing", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ ...user, username: "" });

      expect(res.body.message).toEqual("Please provide username and password");
    });
  });

  describe("POST /login", () => {
    const user = {
      username: "username",
      password: "password",
    };

    beforeEach(() => {
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue({ ...user, id: "123", password: "hashpass" });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 200 status code on success", async () => {
      const res = await supertest(server).post("/api/auth/login").send(user);

      expect(res.status).toBe(200);
    });

    test("returns token on success", async () => {
      const res = await supertest(server).post("/api/auth/login").send(user);

      expect(res.body.token).toBeTruthy();
    });

    test("prisma.user.findUnique is called", async () => {
        await supertest(server).post("/api/auth/login").send(user);
  
        expect(prisma.user.findUnique).toHaveBeenCalled();
      });

    test("returns 401 status code on failure", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      const res = await supertest(server).post("/api/auth/login").send(user);

      expect(res.status).toBe(401);
    });

    test("returns error message on failure", async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      const res = await supertest(server).post("/api/auth/login").send(user);

      expect(res.body.message).toEqual("Invalid login credentials");
    });
  });
});
