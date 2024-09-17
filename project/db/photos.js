const prisma = require("./index");

const getPhotosForBusiness = (businessId) => {
  return prisma.$queryRaw`SELECT * FROM "Photo"
                            WHERE "businessId" = ${businessId}`;
};

// const getPhotoForBusinessList = (businessId) => {
//   return prisma.$queryRaw`SELECT TOP 1 * FROM "Photo"
//                             WHERE "businessId" = ${businessId}`;
// };

// get photos for landing page?
module.exports = { getPhotosForBusiness, getPhotoForBusinessList };
