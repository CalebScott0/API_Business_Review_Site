const { PrismaClient } = require("@prisma/client");
const {
  countBusinessReviews,
  averageBusinessStars,
  countUserReviews,
  countUserComments,
  averageUserStars,
  roundHalf,
} = require("./utils");

const prisma = new PrismaClient();

async function main() {
  console.log("Updating businesses with review count and average stars...");
  const businesses = await prisma.business.findMany({
    select: {
      id: true,
    },
  });
  // for each business, update with review count and average stars rounded to nearest 0.5
  for (let i = 0; i < businesses.length; i++) {
    const reviews = await countBusinessReviews(businesses[i].id);

    const avgStars = roundHalf(
      (await averageBusinessStars(businesses[i].id))._avg.stars
    );

    await prisma.business.update({
      where: { id: business.id },
      data: {
        reviewCount: reviews,
        stars: avgStars,
      },
    });
  }

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

  // for each user, update with review & comment count and average stars rounded to nearest 0.5
  for (let i = 0; i < users.length; i++) {
    const reviews = await countUserReviews(users[i].id);

    const comments = await countUserComments(users[i].id);

    const avgStars = roundHalf(
      (await averageUserStars(users[i].id))._avg.stars
    );

    await prisma.user.update({
      where: { id: business.id },
      data: {
        reviewCount: reviews,
        commentCount: comments,
        stars: avgStars,
      },
    });
  }

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
