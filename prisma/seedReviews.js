const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { reviewArr } = require("../yelp_dataset/Review_ArrayBuilder");

const prisma = new PrismaClient();

async function main() {
  // seed reviews
  console.log("Creating Initial Review Data...");
  for (let i = 0; i < reviewArr.length; i++) {
    const { review_id, text, stars, date, user_id, business_id } = reviewArr[i];
    // convert date/time string into ISOString for prisma DateTime
    /* try/catch implemented to handle incorrect formatted dates from sample data
       using regular conditionals still provided an error on the .toIsoString() method  */
    let dateConverter;
    try {
      dateConverter = new Date(date).toISOString();
    } catch (error) {
      dateConverter = faker.date.past();
    }
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
