const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding business categories...");
  // change this to be all categories to show ranking by occurence in prisma query?
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
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
