const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { reviewArr } = require("../yelp_dataset/Review_ArrayBuilder");

const prisma = new PrismaClient();

async function main() {
  // seed reviews
  console.log("Creating Initial Review Data...");

  const data = reviewArr.map((rev) => ({
    id: rev.review_id,
    // fall back to faker lorem if review has no text
    text: rev.text || faker.lorem.lines({ min: 1, max: 10 }),
    // fall back if no stars were provided with review (1-5 for values)
    stars: rev.stars || Math.floor(Math.random() * 5) + 1,
    createdAt: rev.date
      ? new Date(rev.date).toIsoString
      : faker.date.past({ years: 10 }),
    authorId: rev.user_id,
    businessId: rev.business_id,
  }));

  await prisma.review.createMany({ data });

  // // for (let i = 0; i < reviewArr.length; i++) {
  // //   const { review_id, text, stars, date, user_id, business_id } = reviewArr[i];

  // //   // convert date/time string into ISOString for prisma DateTime
  // //   /* try/catch implemented to provide fallback for incorrect formatted dates from sample data
  // //      using regular conditionals still provided an error on the .toIsoString() method  */
  // //   let dateConverter;

  // //   try {
  // //     dateConverter = new Date(date).toISOString();
  // //   } catch (error) {
  // //     dateConverter = faker.date.past({ years: 10 });
  // //   }

  // //   try {
  // //     await prisma.review.create({
  // //       data: {
  // //         id: review_id,
  // //         // fall back to faker lorem if review has no text
  // //         text: text || faker.lorem.lines({ min: 1, max: 10 }),
  // //         // fall back if no stars were provided with review (1-5 for values)
  // //         stars: stars || Math.floor(Math.random() * 5) + 1,
  // //         createdAt: dateConverter,
  //         authorId: user_id,
  //         businessId: business_id,
  //       },
  //     });
  //   } catch (err) {
  // skip record if error on unique constraint or user/business was deleted in JSON parse.
  // continue;
  // }
  // }

  const sampleReviewData = await prisma.review.findMany({
    skip: 100000,
    take: 10,
  });

  console.log("reviewData", sampleReviewData);

  const sampleReviewData2 = await prisma.review.findMany({
    skip: 4000000,
    take: 10,
  });

  console.log("reviewData2", sampleReviewData2);

  console.log(`Reviews Seeded.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
