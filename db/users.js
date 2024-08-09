const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// aggregate user's review count to update table column
const userReviewCount = (id) => {
  return prisma.review.count({
    where: {
      authorId: id,
    },
  });
};

// aggregate user's average stars to update table column
const userAverageStars = (id) => {
  return prisma.review.aggregate({
    _avg: {
      stars: true,
    },
    where: { authorId: id },
  });
};

// convert into float rounding to the nearest 0.5
const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const updateUser = async (id) => {
  const userReviews = await userReviewCount(id);
  const userAvgRating = await roundHalf(userAverageStars(id));
  await prisma.user.update({
    where: { id },
    data: {
      reviewCount: 2,
      averageStars: roundHalf(2.8),
    },  
  });
};

// only get comments or reviews? no need to show comment data for user?

const findUserById = async (id) => {
  await updateUser(id);
  return prisma.user.findUnique({
    where: { id },
    include: {
      // Comments: true,
      Reviews: true,
    },
  });
};
const findUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};
const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  findUserByEmail,
};
