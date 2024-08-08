const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
async function main() {
  // find all users to assign random user to each seeded comment
  const users = await prisma.user.findMany();
  async function reviewSeed1() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      take: 500000,
    });

    console.log("Creating comments 1/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 250000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 1/9 completed...");
  }
  async function reviewSeed2() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 500000,
      take: 500000,
    });

    console.log("Creating comments 2/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 2/9 completed...");
  }
  async function reviewSeed3() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 1000000,
      take: 500000,
    });

    console.log("Creating comments 3/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 1250000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 3/9 completed...");
  }
  async function reviewSeed4() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 1500000,
      take: 500000,
    });

    console.log("Creating comments 4/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 1750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 4/9 completed...");
  }
  async function reviewSeed5() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 2000000,
      take: 500000,
    });

    console.log("Creating comments 5/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 2250000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 5/9 completed...");
  }
  async function reviewSeed6() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 2500000,
      take: 500000,
    });

    console.log("Creating comments 6/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 2750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 6/9 completed...");
  }
  async function reviewSeed7() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 3000000,
      take: 500000,
    });

    console.log("Creating comments 7/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 3250000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 7/9 completed...");
  }
  async function reviewSeed8() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 3500000,
      take: 500000,
    });

    console.log("Creating comments 8/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 3750000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeding 8/9 completed...");
  }
  async function reviewSeed9() {
    // use pagination to get reviews, too big to find all at once
    // will assign 1 comment to each review
    const reviews = await prisma.review.findMany({
      skip: 4000000,
      take: 500000,
    });

    console.log("Creating comments 9/9...");
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

    const sampleComments = await prisma.review.findMany({
      skip: 4000000,
      take: 10,
      include: {
        Comments: true,
      },
    });

    for (let i = 0; i < sampleComments.length; i++) {
      console.log(sampleComments[i].Comments);
    }
    console.log("Seeded comments.");
  }
  reviewSeed1()
    .then(() => reviewSeed2())
    .then(() => reviewSeed3())
    .then(() => reviewSeed4())
    .then(() => reviewSeed5())
    .then(() => reviewSeed6())
    .then(() => reviewSeed7())
    .then(() => reviewSeed8())
    .then(() => reviewSeed9())
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
