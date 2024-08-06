const { PrismaClient } = require("@prisma/client");
const { userArr } = require("../yelp_dataset/User_ArrayBuilder");

const prisma = new PrismaClient();
async function main() {
  // seed users
  console.log("Creating Initial User Data...");
  for (let i = 0; i < userArr.length; i++) {
    const { user_id, name, yelping_since } = userArr[i];
    const dateConverter = new Date(yelping_since).toISOString();
    let num = 1;
    await prisma.user.create({
      data: {
        id: user_id,
        username: num,
        password: num,
        firstname: name,
        createdAt: dateConverter,
      },
    });
    num++;
  }
  const userData = await prisma.user.findMany({
    skip: 5800,
    take: 10,
  });
  console.log("userData", userData);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
