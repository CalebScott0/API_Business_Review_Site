// AUTH TOKEN WILL BE REQUIRED IN ENDPOINTS
// add middleware in endpoint that check's to make sure review authorId is not user's id
// create a comment on a review that is NOT THE USER'S
// update user comment
// delete user comment

const prisma = require("./index");

const createComment = (commentData) => {
  return prisma.comment.create({
    data: commentData,
  });
};

const updateComment = (id, commentData) => {
  return prisma.comment.update({
    where: { id },
    data: commentData,
  });
};

const deleteComment = (id) => {
  return prisma.review.delete({
    where: { id },
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
