const { PrismaClient } = require("@prisma/client");
const { businessArr } = require("../../yelp_dataset/business_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");

  let data = [];

  for (let bus of businessArr) {
    // split categories into array if business has categories property
    const splitCategories = bus.categories ? bus.categories.split(", ") : [];
    // add unique elements of split categories array to data - (this is the same speed as pushing all items and filtering large array)
    for (let item of splitCategories) {
      !data.includes(item) && data.push(item);
    }
  }
  /* object key = name to match category table column - value = array item (category)
       [ { name: "..." } */
  data = data.map((item) => (item = { name: item }));
  // create category for each object in data array
  const categories = await prisma.category.createManyAndReturn({ data });

  console.log("Category data example: ", categories[0]);
  console.log("Category data example: ", categories[100]);

  console.log(`${categories.length} Categories seeded`);

  // seed categories to businesses
  console.log("Seeding Categories to Businesses...");

  for (let i = 0; i < businessArr.length; i++) {
    // only create category to business record if current business has categories
    if (businessArr[i].categories) {
      const splitCategories = businessArr[i].categories.split(", ");

      // filter out any duplicate category values of business
      const data = splitCategories.filter(
        (value, idx) => splitCategories.indexOf(value) === idx
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
    if (i % 1000 === 0) console.log(`${((i/businessArr.length)*100).toFixed(2)}%`);
  }

  const businesses = await prisma.business.findMany({
    skip: 1000,
    take: 2,
    include: {
      Categories: true,
    },
  });

  console.log("Business with categories: ", businesses[0]);
  console.log("Business with categories: ", businesses[1]);

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
