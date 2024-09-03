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

  const businesses = await prisma.business.findMany({
    include: { Photos: true },
  });
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].Photos.length === 0) {
      try {
        await prisma.business.delete({
          where: { id: businesses[i].id },
        });
        console.log(`Deleted business ${i + 1} / ${businesses.length}`);
      } catch (er) {
        continue;
      }
    }
  }
  console.log(
    (await prisma.business.findMany()).length,
    "Businesses are now in the database."
  );
  console.log("Business Delete Complete");
};
main();
