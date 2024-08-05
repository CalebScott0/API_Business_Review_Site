const { PrismaClient } = require("@prisma/client");
const { faker } = require("@prisma/client");
const { businessArr } = require("../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

// change this to be all categories to show ranking by occurence in prisma query?

// to convert is_open to isOpen boolean: convert to true if = 1 and false for all else

const categoryArray = [];
for (let i = 0; i < businessArr.length; i++) {
  const splitCategories = businessArr[i].categories
    ? businessArr[i].categories.split(", ")
    : [];
  for (let j = 0; j < splitCategories.length; j++) {
    !categoryArray.includes(splitCategories[j]) &&
      categoryArray.push(splitCategories[j]);
  }
}
console.log(categoryArray);
