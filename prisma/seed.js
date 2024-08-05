const { PrismaClient } = require("@prisma/client");
const { faker } = require("@prisma/client");
const { businessArr } = require("../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

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
