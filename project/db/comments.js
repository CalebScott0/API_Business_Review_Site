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

const getCommentsForReview = (reviewId) => {
  return prisma.comment.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
    where: { reviewId },
    orderBy: { createdAt: "desc" },
  });
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
};
