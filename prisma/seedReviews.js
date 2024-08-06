const { PrismaClient } = require("@prisma/client");
const { reviewArr } = require("../yelp_dataset/Review_ArrayBuilder");

const prisma = new PrismaClient();

async function main() {
  // seed reviews
  console.log("Creating Initial Review Data...");
  for (let i = 0; i < reviewArr.length; i++) {
    const { review_id, text, stars, date, user_id, business_id } = reviewArr[i];
    // convert date/time string into ISOString for prisma DateTime
    const dateConverter = new Date(date).toISOString();
    await prisma.review.create({
      data: {
        id: review_id,
        text,
        stars,
        createdAt: dateConverter,
        authorId: user_id,
        businessId: business_id,
      },
    });
  }
  const sampleReviewData = await prisma.review.findMany({
    skip: 6800,
    take: 10,
  });
  console.log("reviewData", sampleReviewData);
  const reviewData = await prisma.review.findMany();
  console.log(`${reviewData.length} Reviews Seeded.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
