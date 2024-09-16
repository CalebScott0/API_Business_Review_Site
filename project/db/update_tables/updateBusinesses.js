const { countBusinessReviews, averageBusinessStars } = require("./utils");

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
    const reviewCount = await countBusinessReviews(businesses[i].id);

    const stars = await averageBusinessStars(businesses[i].id);

    await prisma.business.update({
      where: { id: businesses[i].id },
      data: {
        reviewCount,
        stars,
      },
    });

    // console log first, last and every 50 businesses to see progress
    console.log(
      `Updated business # ${i == 0 ? 1 : i} / ${businesses.length} - ${(
        (i / businesses.length) *
        100
      ).toFixed(2)}%...`
    );
  }

  console.log("Businesses updated");
}

main();
