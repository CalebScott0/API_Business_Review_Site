const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // use pagination to build array of all reviews, too big to find all at once
  // will assign 1 comment to each review
  const reviews = await prisma.review.findMany({
    take: 500000,
  });

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

      [...Array(1)].map(async () => {
        await prisma.comment.create({
          data: {
            text: faker.lorem.lines({ max: 1 }),
            author: users[randUser].id,
            reviewId: review.id,
          },
        });
      });
    })
  );

  const sampleComments = await prisma.review.findMany({
    skip: 250000,
    take: 10,
    include: {
      Comments: true,
    },
  });

  console.log("Reviews:", sampleComments);

  for (let i = 0; i < sampleComments.length; i++) {
    console.log(
      `Comments for review ${sampleComments[i].id}:`,
      sampleComments[i].Comments
    );
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
