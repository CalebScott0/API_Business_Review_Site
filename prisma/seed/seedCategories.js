const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding business categories...");

  const categoriesArr = [];

  for (let i = 0; i < businessArr.length; i++) {
    // split categories into array if business has categories property and push all to categories array
    const splitCategories = businessArr[i].categories
      ? businessArr[i].categories.split(", ")
      : [];
    // add all elements of split categories to categoriesArr
    for (const category of splitCategories) {
      categoriesArr.push(category);
    }
  }

  // for each category in array (non distinct) create prisma category row
  await Promise.all(
    [...categoriesArr].map(async (category) => {
      await prisma.category.create({
        data: {
          name: category,
        },
      });
    })
  );

  const categories = await prisma.category.findMany();

  console.log("Category data example: ", categories[0]);

  // return categories, grouped by name and with count of occurence
  const groupByCategory = await prisma.category.groupBy({
    by: ["name"],
    _count: { name: true },
  });

  console.log("categories grouped by name with count: ", groupByCategory);

  console.log("Categories seeded");

  for (let i = 0; i < businessArr.length; i++) {
    const splitCategories = businessArr[i].categories
      ? businessArr[i].categories.split(", ")
      : [];

    await Promise.all(
      [...splitCategories].map(async (category) => {
        // destructure id from object returned with prisma findUnique
        const { id } = await prisma.category.findUnique({
          select: {
            id: true,
          },
          where: {
            name: category,
          },
        });
        // destrcuture business_id from current object of businessArr
        const { business_id } = businessArr[i];

        /* create a category to business record 
           (business <-> categories = many to many relationship) */
        await prisma.categoryToBusiness.create({
          data: {
            categoryId: id,
            businessId: business_id,
          },
        });
      })
    );
  }
  const businesses = await prisma.business.findMany({
    skip: 68,
    take: 10,
    include: {
      Reviews: true,
      Categories: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
