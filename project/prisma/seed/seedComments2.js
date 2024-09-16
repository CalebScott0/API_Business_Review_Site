const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient({
  log: ["info"],
});

async function main() {
  // find all users to assign random user to each seeded comment
  const users = await prisma.user.findMany();
  // create comments for reviews 500000 reviews at a time, skipping every other 500000
  // will be adding on to pre seeded comments

  async function commentSeed1() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 500000,
      take: 500000,
    });

    console.log("Creating comments 1/4...");
    await Promise.all(
      [...reviews].map((review) => {
        //pick random user index from all users array
        let randUser = Math.floor(Math.random() * (users.length - 1));

        // check if random user is the same as reviews author and change index if true
        if (users[randUser].id === review.authorId) {
          // if randUser is the last user, subtract one instead of adding as index would be out of range otherwise
          if (randUser === users.length - 1) {
            randUser -= 1;
          } else {
            randUser += 1;
          }
        }

        [...Array(1)].map(async () => {
          await prisma.comment.create({
            data: {
              text: faker.lorem.lines({ min: 1, max: 1 }),
              authorId: users[randUser].id,
              reviewId: review.id,
              createdAt: faker.date.past({ years: 10 }),
            },
          });
        });
      })
    );

    const comments = await prisma.review.findMany({
      skip: 750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (const comment of comments) {
      console.log(comment);
    }
    console.log("Seeding 1/4 completed...");
  }
  async function commentSeed2() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 1000000,
      take: 500000,
    });

    console.log("Creating comments 2/4...");
    await Promise.all(
      [...reviews].map((review) => {
        //pick random user index from all users array
        let randUser = Math.floor(Math.random() * (users.length - 1));

        // check if random user is the same as reviews author and change index if true
        if (users[randUser].id === review.authorId) {
          // if randUser is the last user, subtract one instead of adding as index would be out of range otherwise
          if (randUser === users.length - 1) {
            randUser -= 1;
          } else {
            randUser += 1;
          }
        }

        [...Array(1)].map(async () => {
          await prisma.comment.create({
            data: {
              text: faker.lorem.lines({ min: 1, max: 1 }),
              authorId: users[randUser].id,
              reviewId: review.id,
              createdAt: faker.date.past({ years: 10 }),
            },
          });
        });
      })
    );

    const comments = await prisma.review.findMany({
      skip: 1250000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (const comment of comments) {
      console.log(comment);
    }
    console.log("Seeding 2/4 completed...");
  }
  async function commentSeed3() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 2500000,
      take: 500000,
    });

    console.log("Creating comments 3/4...");
    await Promise.all(
      [...reviews].map((review) => {
        //pick random user index from all users array
        let randUser = Math.floor(Math.random() * (users.length - 1));

        // check if random user is the same as reviews author and change index if true
        if (users[randUser].id === review.authorId) {
          // if randUser is the last user, subtract one instead of adding as index would be out of range otherwise
          if (randUser === users.length - 1) {
            randUser -= 1;
          } else {
            randUser += 1;
          }
        }

        [...Array(1)].map(async () => {
          await prisma.comment.create({
            data: {
              text: faker.lorem.lines({ min: 1, max: 1 }),
              authorId: users[randUser].id,
              reviewId: review.id,
              createdAt: faker.date.past({ years: 10 }),
            },
          });
        });
      })
    );

    const comments = await prisma.review.findMany({
      skip: 2750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (const comment of comments) {
      console.log(comment);
    }
    console.log("Seeding 3/4 completed...");
  }
  async function commentSeed4() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 3000000,
      take: 25000,
    });

    console.log("Creating comments 4/4...");
    await Promise.all(
      [...reviews].map((review) => {
        //pick random user index from all users array
        let randUser = Math.floor(Math.random() * (users.length - 1));

        // check if random user is the same as reviews author and change index if true
        if (users[randUser].id === review.authorId) {
          // if randUser is the last user, subtract one instead of adding as index would be out of range otherwise
          if (randUser === users.length - 1) {
            randUser -= 1;
          } else {
            randUser += 1;
          }
        }

        [...Array(1)].map(async () => {
          await prisma.comment.create({
            data: {
              text: faker.lorem.lines({ min: 1, max: 1 }),
              authorId: users[randUser].id,
              reviewId: review.id,
              createdAt: faker.date.past({ years: 10 }),
            },
          });
        });
      })
    );

    const comments = await prisma.review.findMany({
      skip: 3000000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (const comment of comments) {
      console.log(comment);
    }
  }
  commentSeed1()
    .then(() => commentSeed2())
    .then(() => commentSeed3())
    .then(() => commentSeed4())
    .then(() => console.log("Seeded comments."))
    .catch((e) => {
      console.log(e);
    });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
