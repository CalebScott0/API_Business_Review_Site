const prisma = require("./index");

// include name of category and count of businesses containing each category
const countCategories = (category) => {
  return prisma.categoryToBusiness.count({
    where: {
      categoryName: category,
    },
  });
};

const updateCategory = async (category) => {
  await countCategories(category);
};

async function main() {
  const categories = await countCategories();
  console.log(categories);
}
main();
