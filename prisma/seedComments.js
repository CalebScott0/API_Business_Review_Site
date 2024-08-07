const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // use pagination to build array of all reviews, too big to find all at once
  // will assign random number of comments to each review (1-5 comments)
  const reviewArr = await prisma.review.findMany({
    take: 500000,
  });
  const reviewArr2 = await prisma.review.findMany({
    skip: 500000,
    take: 500000,
  });
  const reviewArr3 = await prisma.review.findMany({
    skip: 1000000,
    take: 500000,
  });
  const reviewArr4 = await prisma.review.findMany({
    skip: 1500000,
    take: 500000,
  });
  const reviewArr5 = await prisma.review.findMany({
    skip: 2000000,
    take: 500000,
  });
  const reviewArr6 = await prisma.review.findMany({
    skip: 2500000,
    take: 500000,
  });
  const reviewArr7 = await prisma.review.findMany({
    skip: 3000000,
    take: 500000,
  });
  const reviewArr8 = await prisma.review.findMany({
    skip: 3500000,
    take: 500000,
  });
  const reviewArr9 = await prisma.review.findMany({
    skip: 4000000,
    take: 500000,
  });

  const reviews = [
    ...reviewArr,
    ...reviewArr2,
    ...reviewArr3,
    ...reviewArr4,
    ...reviewArr5,
    ...reviewArr6,
    ...reviewArr7,
    ...reviewArr8,
    ...reviewArr9,
  ];
  // find all users to assign random user to each seeded comment
  const users = await prisma.user.findMany();

  console.log("Creating comments...");
  await Promise.all(
    [...reviews].map((review) => {
      //pick random user index from all users array
      let randUser = Math.floor(Math.random() * (users.length - 1));
      // check if random user is the same as reviews author and change index if true
      if (users[randUser].id === review.authorId) {
        // if randUser is the last user, subtract one instead of adding as index would be out of range otherwise
        if (randUser + 1 === users.length) {
          randUser -= 1;
        } else {
          randUser += 1;
        }
      }
      // random number of comments to seed to current review
      const numOfComments = Math.floor(Math.random() * 5) + 1;

      [...Array(numOfComments)].map(async () => {
        await prisma.comment.create({
          data: {
            text: faker.lorem.lines({ min: 1, max: 3 }),
            author: users[randUser].id,
            reviewId: review.id,
          },
        });
      });
    })
  );

  const sampleComments = await prisma.review.findMany({
    skip: 100,
    take: 10,
    include: {
      Comments: true,
    },
  });

  console.log("Reviews:", sampleComments);

  for (let i = 0; i < sampleComments.length; i++) {
    console.log(`Comments for review ${100 + 1}:`, sampleComments[i].Comments);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
