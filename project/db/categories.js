const prisma = require("./index");
const categories = [
  "Active Life",
  "Arts & Entertainment",
  "Automotive",
  "Beauty & Spas",
  "Education",
  "Event Planning & Services",
  "Financial Services",
  "Food",
  "Health & Medical",
  "Home Services",
  "Hotels & Travel",
  "Local Services",
  "Local Flavor",
  "Mass Media",
  "Nightlife",
  "Pets",
  "Professional Services",
  "Public Services & Government",
  "Real Estate",
  "Religious Organizations",
  "Restaurants",
  "Shopping",
];

// get all categories, returning id and name - ordered by name asc
const getCategories = () => {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    // first record returning in asc name order is "& Probates" - remove for ui cleanliness
    skip: 1,
    orderBy: { name: "asc" },
  });
};

const getCategoriesToDisplay = () => {
  return prisma.category.findMany({
    where: {
      name: { in: [...categories] },
    },
    orderBy: {
      name: "asc",
    },
  });
};

module.exports = { getCategories, getCategoriesToDisplay };
