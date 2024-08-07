const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // check data length
  const reviewData = await prisma.review.findMany({
    skip: 4100000,
    take: 10,
  });

  console.log("reviewData", reviewData.length);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
