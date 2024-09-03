const prisma = require("./index");

const main = async () => {
  console.log("Deleting Businesses With No Photos...");

  const countBus = (await prisma.business.findMany()).length;
  const busWithPics = (
    await prisma.business.findMany({
      where: { Photos: { some: {} } },
    })
  ).length;
  console.log(`${countBus - busWithPics} businesses to be deleted`);

  const numBus = await prisma.business.findMany({ include: { Photos: true } });
  numBus.forEach(async (ele, idx) => {
    if (ele.Photos.length === 0) {
      await prisma.business.delete({
        where: { id: ele.id },
      });
      console.log(`Deleted business ${idx + 1} / ${numBus.length}`);
    }
  });
  console.log(
    (await prisma.business.findMany()).length,
    "Businesses are now in the database."
  );
  console.log("Business Delete Complete");
};
main();
