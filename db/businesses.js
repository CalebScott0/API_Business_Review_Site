const prisma = require("./index");
// get business by id including reviews and review comments
const getBusinessById = (id) => {
  return prisma.business.findUnique({
    where: { id },
    include: {
      Reviews: {
        include: {
          Comments: true,
        },
      },
    },
  });
};
// get businesses by category just include the top review (look at what yelp has?
// (group by stars order by most recent?)
