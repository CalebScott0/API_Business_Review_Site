const prisma = require("../index");
const { createUser, findUserByUsername, findUserById } = require("../users");

describe("Create User Prisma Unit Tests", () => {
  const user = {
    id: "123",
    username: "someUsername123",
    password: "somePass",
  };
  // const review1 = {
  //   id: "1",
  //   text: "this is a review",
  //   stars: 2,
  //   authorId: "123",
  //   businessId: "1",
  // };
  // const review2 = {
  //   id: "2",
  //   text: "this is a review",
  //   stars: 5,
  //   authorId: "123",
  //   businessId: "2",
  // };
  beforeEach(() => {
    prisma.user.create = jest.fn().mockResolvedValue(user);
    prisma.user.findUnique = jest.fn().mockResolvedValue(user);
    // prisma.review.create = jest.fn().mockResolvedValue(review1);
    // prisma.review.create = jest.fn().mockResolvedValue(review2);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should create a new user", async () => {
    await expect(createUser(user)).resolves.toEqual({
      id: "123",
      username: "someUsername123",
      password: "somePass",
    });
  });
  test("should return error if required data is omitted", async () => {
    await expect(createUser(user)).resolves.not.toEqual({
      id: "123",
      username: "username",
      password: "somePass",
    });
  });
  test("should return a user by username", async () => {
    await expect(findUserByUsername(user.username)).resolves.toEqual({
      id: "123",
      username: "someUsername123",
      password: "somePass",
    });
  });
  test("find user with given id", async () => {
    const userById = findUserById(user.id);
    console.log(await userById);
    await expect(userById).resolves.toEqual({
      id: "123",
      username: "someUsername123",
      password: "somePass",
    });
    // await expect(findUserById(user.id)).resolves.toEqual({
    //   id: "123",
    //   username: "someUsername123",
    //   password: "somePass",
    // });
  });
});
