const prisma = require("./index");

const createComment = (commentData) => {
  return prisma.comment.create({
    data: commentData,
  });
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

const getCommentById = (id) => {
  return prisma.comment.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
};
