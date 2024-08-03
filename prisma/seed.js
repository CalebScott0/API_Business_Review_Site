const { PrismaClient } = require("@prisma/client");
const { faker } = require("@prisma/client");
const prisma = new PrismaClient();
const businesses = require("../yelp_dataset/dataset_business");

async function main() {
  for (let i = 0; i < businesses.length; i++) {
    const { business_id, name, address, city, state, stars, review_count } =
      businesses[i];

    await prisma.business.create({
      business_id,
      name,
      address,
      city,
      state,
      stars,
      review_count,
    });
  }
  const businessData = await prisma.business.findMany({
    take: 10,
  });
  console.log("Business", businessData);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
