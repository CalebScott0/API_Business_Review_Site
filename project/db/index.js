const { PrismaClient } = require("@prisma/client");
const { withOptimize } = require("@prisma/extension-optimize");

const prisma = new PrismaClient().$extends(withOptimize());

module.exports = prisma;
