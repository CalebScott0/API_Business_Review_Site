const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { userArr } = require("../../yelp_dataset/User_ArrayBuilder");

const prisma = new PrismaClient();

async function main() {
  // seed users
  console.log("Mapping User data...");
  const data = userArr.map((user, i) => ({
    id: user.user_id,
    username: `${faker.internet.displayName({
      firstName: user.name,
      lastName: faker.internet.lastName,
    })}#${i}`,
    password: `${faker.internet.password()}`,
    firstname: user.name,
    createdAt: new Date(user.yelping_since).toISOString(),
  }));

  console.log("Creating Initial User Data...");

  await prisma.user.createMany({ data });
  // for (let i = 0; i < userArr.length; i++) {
  //   const { user_id, name, yelping_since } = userArr[i];

  // convert yelping_since date/time string into ISOString for prisma DateTime
  // const dateConverter = new Date(yelping_since).toISOString();

  // await prisma.user.create({
  //   data: {
  //     id: user_id,
  //     // create display name using given names as base, may use one or both provided names
  //     // index added to avoid duplicate values
  //     username: `${faker.internet.displayName({
  //       firstName: name,
  //       lastName: faker.internet.lastName,
  //     })}#${i}`,
  //     password: `${faker.internet.password()}`,
  //     firstname: name,
  //     createdAt: dateConverter,
  //   },
  // });
  // }

  const sampleUserData = await prisma.user.findMany({
    skip: 100000,
    take: 10,
  });

  console.log("userData", sampleUserData);

  const userData = await prisma.user.findMany();

  console.log(`${userData.length} Users Seeded.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
