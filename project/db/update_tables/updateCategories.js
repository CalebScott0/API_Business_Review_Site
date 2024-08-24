const prisma = require("../index");

async function main() {
  // update category with count of businesses
  const categories = await prisma.category.findMany();

  console.log(`Updating ${categories.length} categories...`);

  for (let item of categories) {
    const businessCount = await prisma.categoryToBusiness.count({
      where: {
        categoryName: item.name,
      },
    });

    await prisma.category.update({
      where: {
        id: item.id,
      },
      data: { businessCount },
    });
  }

  console.log(await prisma.category.findMany(), "Categories Updated");
}

main();
