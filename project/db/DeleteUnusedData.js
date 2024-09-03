const prisma = require("./index");

const main = async () => {
  console.log("Searching businesses...");
  //   const businesses = await prisma.business.findMany({
  //     where: {
  //       Photos: {
  //         some: {},
  //       },
  //     },
  //   });

  //   const photos = await prisma.photo.findMany({
  //     distinct: ["businessId"],
  //   });

  //   const businessArr = businesses.map((ele) => ele.id);
  //   const photoArr = photos.map((ele) => ele.businessId);

  // check equality of arrays
  //   if(businessArr.sort().join(",") === photoArr.sort().join(",")) {
  // }
  const busWithPics = (
    await prisma.business.findMany({
      where: {
        Photos: {
          some: {},
        },
      },
    })
  ).length;
  const allBus = (await prisma.business.findMany()).length;
  console.log("Businesses:", allBus);
  console.log("Businesses to delete:", allBus - busWithPics);
  console.log("Businesses after delete:", busWithPics);
  console.log("Deleting businesses...");

  await prisma.business.deleteMany({
    where: {
      Photos: {
        none: {},
      },
    },
  });

  console.log(
    "Businesses after delete: ",
    (await prisma.business.findMany()).length
  );
  console.log("Data deleted");
};
main();
