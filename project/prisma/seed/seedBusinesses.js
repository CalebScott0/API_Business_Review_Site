const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  // seed businesses without categories, attributes, and hours for now.
  console.log("Creating Initial Business Data...");

  const data = businessArr.map((bus) => ({
    id: bus.business_id,
    name: bus.name,
    address: bus.address,
    city: bus.city,
    state: bus.state,
    zipCode: bus.postal_code,
    latitude: bus.latitude,
    longitude: bus.longitude,
    isOpen: (is_open = 1 ? true : false),
  }));

  await prisma.business.createMany({
    data,
  });

  // for (let bus of businessArr) {
  //   const {
  //     business_id,
  //     name,
  //     address,
  //     city,
  //     state,
  //     postal_code,
  //     latitude,
  //     longitude,
  //     is_open,
  //   } = bus;

  //   // to convert is_open to boolean: convert to true if = 1 and false for all else
  //   const openStatus = is_open === 1 ? true : false;

  //   await prisma.business.create({
  //     data: {
  //       id: business_id,
  //       name,
  //       address,
  //       city,
  //       state,
  //       zipCode: postal_code,
  //       latitude,
  //       longitude,
  //       isOpen: openStatus,
  //     },
  //   });
  // }

  const sampleBusinessData = await prisma.business.findMany({
    skip: 100000,
    take: 10,
  });

  console.log("businessData", sampleBusinessData);

  const businessData = await prisma.business.findMany();

  console.log(`${businessData.length} Businesses Seeded.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
