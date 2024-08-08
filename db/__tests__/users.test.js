const prisma = require("../index");
const { createUser, userReviewCount, userAverageStars } = require("../users");

describe("Create User Prisma Unit Tests", () => {
  const user = {
    id: "123",
    username: "someUsername123",
    password: "somePass",
  };
  const review1 = {
    id: "1",
    text: "this is a review",
    stars: 2,
    authorId: "123",
    businessId: "1",
  };
  const review2 = {
    id: "2",
    text: "this is a review",
    stars: 5,
    authorId: "123",
    businessId: "2",
  };
  beforeEach(() => {
    prisma.user.create = jest.fn().mockResolvedValue(user);
    prisma.review.findMany = jest.fn().mockResolvedValue([review1, review2]);
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
  test("should return count of user's reviews", async () => {
    const review = await prisma.review.findMany({
      where: {
        id: "123",
      },
    });
    console.log(review);
    await expect(userReviewCount(user.id)).resolves.toBe(2);
  });
});
