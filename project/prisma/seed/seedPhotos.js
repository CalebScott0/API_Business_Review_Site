const { PrismaClient } = require("@prisma/client");
const { photosArr } = require("../../yelp_dataset/photo_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Photos...");
  // can not use createMany as some businessIds were deleted in json parse
  for (let photo of photosArr) {
    try {
      await prisma.photo.create({
        data: {
          id: photo.photo_id,
          businessId: photo.business_id,
          caption: photo.caption,
          label: photo.label,
        },
      });
    } catch (e) {
      continue;
    }
  }

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
