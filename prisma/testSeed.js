const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.findMany({
  //   skip: 1000,
  //   take: 5,
  //   include: {
  //     Reviews: true,
  //   },
  // });
  // console.log(user[3]);
  const users = await prisma.user.findMany();
  // console.log(users[users.length - 1]);
  // console.log(users.length);
  for (let i = 0; i < 5; i++) {
    const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
    console.log(users[randUser].id);
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
