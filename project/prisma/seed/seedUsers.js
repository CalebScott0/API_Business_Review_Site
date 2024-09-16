const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { userArr } = require("../../yelp_dataset/User_ArrayBuilder");

const prisma = new PrismaClient();

async function main() {
  // seed users

  console.log("Mapping User data...");

  let users = userArr.map((user, i) => ({
    id: user.user_id,
    username: `${faker.internet.displayName({
      firstName: user.name,
      lastName: faker.internet.lastName,
    })}#${i}`,
    password: `${faker.internet.password()}`,
    firstname: user.name,
    createdAt: new Date(user.yelping_since).toISOString(),
  }));
  // delete the slice after seeded to new db
  data = users.slice(1300010, 1600000);
  console.log(data.slice(0, 5));
  console.log("Creating Initial User Data...");
  await prisma.user.createMany({ data });

  // const sampleUserData = await prisma.user.findMany({
  //   skip: 100000,
  //   take: 10,
  // });

  // console.log("userData", sampleUserData);
  console.log(`${data.length} users seeded`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
