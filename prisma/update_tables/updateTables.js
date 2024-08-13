const { PrismaClient, Prisma } = require("@prisma/client");
const {
  countBusinessReviews,
  averageBusinessStars,
  countUserReviews,
  countUserComments,
  averageUserStars,
  roundHalf,
} = require("./utils");
const { isErrored } = require("supertest/lib/test");

const prisma = new PrismaClient();

async function main() {
  console.log("Updating businesses with review count and average stars...");
  const businesses = await prisma.business.findMany({
    select: {
      id: true,
    },
  });
  businesses.forEach(async (business) => {
    const reviews = await countBusinessReviews(business.id);
    const avgStars = await averageBusinessStars(business.id);
    await prisma.business.update({
      where: { id: business.id },
      data: {
        reviewCount: reviews,
        stars: avgStars,
      },
    });
  });
  console.log(
    await prisma.business.findUnique({
      where: {
        id: "3UdVZ2F978ZISKT7WlFrjg",
      },
    })
  );
  console.log("Businesses updated");

  console.log("Updating users with review count and average stars...");
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });
  users.forEach(async (user) => {
    const reviews = await countUserReviews(user.id);
    const comments = await countUserComments(user.id);
    const avgStars = await averageUserStars(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        reviewCount: reviews,
        commentCount: comments,
        stars: avgStars,
      },
    });
  });
  console.log(
    await prisma.user.findUnique({
      where: {
        id: "ZXsESlVN4d0smeMivvxJtA",
      },
    })
  );
  console.log("Users updated");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
