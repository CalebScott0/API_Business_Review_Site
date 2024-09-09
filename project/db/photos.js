const prisma = require("./index");

const getPhotosForBusiness = (businessId) => {
  return prisma.$queryRaw`SELECT * FROM "Photo"
                            WHERE "businessId" = ${businessId}`;
};


// get photos for landing page?
module.exports = { getPhotosForBusiness };
