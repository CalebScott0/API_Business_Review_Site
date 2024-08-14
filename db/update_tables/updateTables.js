const {
  countBusinessReviews,
  averageBusinessStars,
  // countUserReviews,
  // countUserComments,
  // averageUserStars,
  roundHalf,
} = require("./utils");

const prisma = require("../index");

async function main() {
  const businesses = await prisma.business.findMany({
    where: {
      reviewCount: 0,
      stars: 0,
    },
    select: {
      id: true,
    },
  });
  console.log(
    `Updating ${businesses.length} businesses with review count and average stars...`
  );
  // for each business, update with review count and average stars rounded to nearest 0.5
  for (let i = 0; i < businesses.length; i++) {
    const reviews = await countBusinessReviews(businesses[i].id);

    const avgStars = roundHalf(
      (await averageBusinessStars(businesses[i].id))._avg.stars
    );

    await prisma.business.update({
      where: { id: businesses[i].id },
      data: {
        reviewCount: reviews,
        stars: avgStars,
      },
    });

    // console log first, last and every 50 businesses to see progress
    if (i === 0 || i % 50 === 0 || i === businesses.length - 1) {
      console.log(
        await prisma.business.findUnique({
          where: { id: businesses[i].id },
        })
      );
      console.log(`Updated business # ${i} / ${businesses.length}`);
    }
  }

  console.log("Businesses updated");
}

main();
