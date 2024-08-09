const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding business categories...");
  // change this to be all categories to show ranking by occurence in prisma query?
  const categories = [];
  for (let i = 0; i < businessArr.length; i++) {
    // split categories into array if business has categories property
    const splitCategories = businessArr[i].categories
      ? businessArr[i].categories.split(", ")
      : [];
    categories.push(splitCategories[j]);
  }
  
  // SEED CATEGORIES INTO CATEGORIES TABLE AND THEN SEED CATEGORIES TO BUSINESS TABLE ALL IN THIS FILE AT ONCE!!

  //   USE ORDER BY ON RETURN IN PRISMA QUERY TO ORDER BY CATEGORIES
  //  AND INCLUDE A COUNT OF EACH IN THE RESPONSE!!
  console.log(categories[0]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
