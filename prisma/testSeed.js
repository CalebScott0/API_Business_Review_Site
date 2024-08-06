const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const userData = await prisma.user.findMany();
  console.log("userData", userData.length);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
