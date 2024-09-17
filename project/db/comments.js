const prisma = require("./index");

const updateUserOnComment = async (authorId, type) => {
  // const comCount = parseInt((await countUserComments(authorId))[0].count);
  if (type === "create") {
    await prisma.$queryRaw`UPDATE "User" SET "commentCount" = "commentCount" + 1
                          WHERE id = ${authorId};`;
  } else if (type === "delete") {
    await prisma.$queryRaw`UPDATE "User" SET "commentCount" = "commentCount" - 1
                          WHERE id = ${authorId};`;
  }
};

const createComment = (data) => {
  // const comment = await prisma.comment.create({ data });
  // await updateUserOnComment(data.authorId, "create");
  // return comment;
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
  // const authorId = await prisma.comment.findUnique({
  //   select: {
  //     authorId: true,
  //   },
  //   where: { id },
  // });
  // const comment = await prisma.comment.delete({
  //   where: { id },
  // });
  // await updateUserOnComment(authorId.authorId, "delete");
  // return comment;
  return prisma.comment.delete({
    where: { id },
  });
};

const getCommentsForReview = ({ reviewId, startIndex = 0, limit = 2 }) => {
  return prisma.$queryRaw`SELECT c.*, u.username as author
                          FROM "Comment" c 
                          LEFT JOIN "User" u ON c."authorId" = u.id
                          WHERE "reviewId" = ${reviewId}
                          ORDER BY "createdAt" DESC
                          LIMIT ${limit} OFFSET ${startIndex};`;
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

const getCommentsForUser = (authorId) => {
  return prisma.$queryRaw`SELECT c.*, b.name AS "businessName", u.username AS "reviewAuthor" FROM "Comment" c
                          LEFT JOIN "Review" r ON c."reviewId" = r.id
                          JOIN "Business" b on r."businessId" = b.id
                          JOIN "User" u on r."authorId" = u.id
                          WHERE c."authorId" = ${authorId}
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
  updateUserOnComment,
};
