const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");

  const categoriesArr = [];

  for (let i = 0; i < businessArr.length; i++) {
    // split categories into array if business has categories property
    const splitCategories = businessArr[i].categories
      ? businessArr[i].categories.split(", ")
      : [];
    // add unique elements of split categories array to categoriesArr
    for (const category of splitCategories) {
      !categoriesArr.includes(category) && categoriesArr.push(category);
    }
  }

  // for each category in array create prisma category row
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
  console.log("Category data example: ", categories[100]);

  console.log(`${categories.length} Categories seeded`);

  // seed categories to businesses
  console.log("Seeding Categories to Businesses...");

  for (let i = 0; i < businessArr.length; i++) {
    // only create category to business record if current business has categories
    if (businessArr[i].categories) {
      const splitCategories = businessArr[i].categories.split(", ");

      await Promise.all(
        [...splitCategories].map(async (category) => {
          // destructure id & name from object returned with prisma findUnique
          const { id, name } = await prisma.category.findUnique({
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
              categoryName: name,
              categoryId: id,
              businessId: business_id,
            },
          });
        })
      );
    }
  }
  const businesses = await prisma.business.findMany({
    skip: 68,
    take: 10,
    include: {
      Categories: true,
    },
  });

  console.log("Businesses with categories: ", businesses);

  // group categories by occurence of name
  const groupedCategories = await prisma.categoryToBusiness.groupBy({
    by: ["categoryName"],
    _count: {
      categoryName,
    },
    orderBy: {
      _count: {
        categoryName: "desc",
      },
    },
  });

  console.log("Grouped categories: ", groupedCategories);

  console.log("Categories to Businesses seeded.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
