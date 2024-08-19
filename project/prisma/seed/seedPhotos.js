const { PrismaClient } = require("@prisma/client");
const { photosArr } = require("../../yelp_dataset/photo_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Photos...");

  photosArr.map(async (element, index) => {
    const { photo_id, business_id, caption, label } = element;
    await prisma.photo.create({
      data: {
        id: photo_id,
        businessId: business_id,
        caption,
        label,
      },
    });
  });

  console.log(await prisma.photo.findFirst());
  console.log(
    await prisma.photo.findUnique({
      where: {
        id: "NHEtLh7APk7Yssjo0h45VA",
      },
    })
  );

  console.log(`${(await prisma.photo.findMany()).length} Photos Seeded`);
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
  });
