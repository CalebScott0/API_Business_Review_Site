const { PrismaClient } = require("@prisma/client");
const { photosArr } = require("../../yelp_dataset/photo_dataset");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Photos...");

 for(let i = 0; i < photosArr.length; i++)
    if(!business_id) {
        continue;
    }
    await prisma.photo.create({
      data: {
        id: photosArr[i].photo_id,
        businessId: photosArr[i].business_id,
        caption: photosArr[i].caption,
        label: photosArr[i].label,
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
