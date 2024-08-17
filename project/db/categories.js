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

// get all categories, returning id and name - ordered by count of businesses desc
const getCategories = () => {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      businessCount: true,
    },
    where: {
      businessCount: { gte: 100 },
    },
    orderBy: { businessCount: "desc" },
  });
};

module.exports = getCategories;
