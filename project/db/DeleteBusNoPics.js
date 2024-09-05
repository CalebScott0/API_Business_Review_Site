const prisma = require("./index");

const main = async () => {
  const businessesWithNoPics =
    await prisma.$queryRaw`SELECT * FROM "Business" t1
  WHERE NOT EXISTS (SELECT t2."businessId" FROM "Photo" t2 WHERE t1.id = t2."businessId");`;

  console.log(`${businessesWithNoPics.length} businesses to be deleted`);

  console.log("Deleting businesses...");

  await prisma.$queryRaw`DELETE FROM "Business" t1
  WHERE NOT EXISTS (SELECT t2."businessId" FROM "Photo" t2 WHERE t1.id = t2."businessId");`;

  const busAfterDelete = await prisma.$queryRaw`SELECT * FROM "Business"`;

  console.log(`${busAfterDelete} businesses are now in the database.`);

  console.log("Delete complete.");
};
main();
