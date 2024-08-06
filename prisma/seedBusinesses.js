const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  // seed businesses without categories, attributes, and hours for now.
  console.log("Creating Initial Business Data...");

  for (let i = 0; i < businessArr.length; i++) {
    const {
      business_id,
      name,
      address,
      city,
      state,
      postal_code,
      latitude,
      longitude,
      is_open,
    } = businessArr[i];

    const openStatus = is_open === 1 ? true : false;

    await prisma.business.create({
      data: {
        id: business_id,
        name: name,
        address,
        city,
        state,
        zipCode: postal_code,
        latitude,
        longitude,
        isOpen: openStatus,
      },
    });
  }

  const sampleBusinessData = await prisma.business.findMany({
    skip: 6800,
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
// change this to be all categories to show ranking by occurence in prisma query?

// to convert is_open to isOpen boolean: convert to true if = 1 and false for all else

// const categoryArray = [];
// for (let i = 0; i < businessArr.length; i++) {
//   const splitCategories = businessArr[i].categories
//     ? businessArr[i].categories.split(", ")
//     : [];
//   for (let j = 0; j < splitCategories.length; j++) {
//     !categoryArray.includes(splitCategories[j]) &&
//       categoryArray.push(splitCategories[j]);
//   }
// }
// // console.log(categoryArray);
