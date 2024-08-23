const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");

  const data = [];

  for (let bus of businessArr) {
    // split categories into array if business has categories property
    const splitCategories = bus.categories ? bus.categories.split(", ") : [];
    /* add unique elements of split categories array to data
        object key = name of each array item to match category table column 
            [ { name: "..." } ]*/
    for (let name of splitCategories) {
      !data.includes(name) && data.push({ name });
    }
  }

  // for each category in array create prisma category row
  await prisma.category.createMany({ data });

  const categories = await prisma.category.findMany();
  console.log("Category data example: ", categories[0]);
  console.log("Category data example: ", categories[100]);

  console.log(`${categories.length} Categories seeded`);

  // seed categories to businesses
  console.log("Seeding Categories to Businesses...");

  for (let bus of businessArr) {
    // only create category to business record if current business has categories
    if (bus.categories) {
      const splitCategories = bus.categories.split(", ");

      // filter out any duplicate category values of business
      const data = splitCategories.filter(
        (category, index) => splitCategories.indexOf(category) === index
      );

      await Promise.all(
        [...data].map(async (category) => {
          // destructure id & name from object returned with prisma findUnique
          const { id, name } = await prisma.category.findUnique({
            where: {
              name: category,
            },
          });
          // destrcuture business_id from current object of businessArr
          const { business_id } = bus;

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
    skip: 1000,
    take: 2,
    select: {
      name: true,
      Categories: true,
    },
  });

  console.log("Business with categories: ", businesses);

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
