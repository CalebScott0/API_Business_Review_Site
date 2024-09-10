const prisma = require("./index");

const createComment = (data) => {
  return prisma.comment.create({ data });
};

const updateComment = (id, text) => {
  return prisma.comment.update({
    where: { id },
    data: {
      text,
      updatedAt: new Date(),
    },
  });
};

const deleteComment = (id) => {
  return prisma.comment.delete({
    where: { id },
  });
};

const getCommentsForReview = async (reviewId) => {
  return prisma.$queryRaw`SELECT c.*, u.username as author
                          FROM "Comment" c JOIN "User" u ON u.id = c."authorId"
                          WHERE "reviewId" = ${reviewId}
                          ORDER BY "createdAt" DESC;`;
  // return prisma.comment.findMany({
  //   include: {
  //     author: {
  //       select: {
  //         username: true,
  //       },
  //     },
  //   },
  //   where: { reviewId },
  //   orderBy: { createdAt: "desc" },
  // });
};

const getCommentsForUser = (userId) => {
  return prisma.$queryRaw`SELECT c.*, b.name AS "businessName", u.username AS "reviewAuthor" FROM "Comment" c
                          JOIN "Review" r ON r.id = c."reviewId"
                          JOIN "Business" b on b.id = r."businessId" 
                          JOIN "User" u on u.id = r."authorId"
                          WHERE c."authorId" = ${userId}
                          ORDER BY "createdAt" DESC;`;
};

const getCommentById = (id) => {
  return prisma.comment.findUnique({
    where: { id },
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentsForReview,
  getCommentsForUser,
};
