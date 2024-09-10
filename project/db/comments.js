const { countUserComments } = require("./update_tables/utils");
const prisma = require("./index");

const updateUserOnComment = async (authorId) => {
  const comCount = parseInt((await countUserComments(authorId))[0].count);
  await prisma.user.update({
    where: { id: authorId },
    data: {
      commentCount: comCount,
    },
  });
};

const createComment = async (data) => {
  const comment = await prisma.comment.create({ data });
  await updateUserOnComment(data.authorId);
  return comment;
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

const deleteComment = async (id) => {
  const authorId = await prisma.comment.findUnique({
    select: {
      authorId: true,
    },
    where: { id },
  });
  console.log(authorId);
  // const authorId = await prisma.$queryRaw`SELECT "authorId" FROM "Comment"
  //                                        WHERE id = ${id}`;
  const comment = await prisma.comment.delete({
    where: { id },
  });
  await updateUserOnComment(authorId.authorId);
  return comment;
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
