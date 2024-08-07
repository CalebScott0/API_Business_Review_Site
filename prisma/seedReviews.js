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
    /* try/catch implemented to provide fallback for incorrect formatted dates from sample data
       using regular conditionals still provided an error on the .toIsoString() method  */

    let dateConverter;

    try {
      dateConverter = new Date(date).toISOString();
    } catch (error) {
      dateConverter = faker.date.past({ years: 10 });
    }

    // assign new user or business if related user/business for review has been deleted when parsing json
    const newUser =
      !user_id &&
      (await prisma.user.create({
        data: {
          username: faker.internet.displayName({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
          }),
          password: faker.internet.password(),
        },
      }));

    const newBusiness =
      !business_id &&
      (await prisma.business.create({
        data: {
          name: faker.word.noun(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
        },
      }));

    await prisma.review.create({
      data: {
        id: review_id,
        // fallback to faker lorem if review has no text
        text: text || faker.lorem.lines({ min: 1, max: 10 }),
        // fall back if no stars were provided with review (1-5 for values)
        stars: stars || Math.floor(Math.random() * 5) + 1,
        createdAt: dateConverter,
        // fall back if user/business was deleted when json was parsed
        authorId: user_id || newUser.id,
        businessId: business_id || newBusiness.id,
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
