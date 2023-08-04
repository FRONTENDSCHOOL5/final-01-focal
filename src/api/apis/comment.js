import authInstance from '../../api/instance/authInstance';

export const getCommentListAPI = async (postId) => {
  try {
    const response = await authInstance.get(`/post/${postId}/comments`);

    const sortedData = response.data.comments.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    return sortedData;
  } catch (error) {
    console.log(error);
  }
};

export const createPostCommentAPI = async (inputText, postId) => {
  try {
    const response = await authInstance.post(`/post/${postId}/comments`, {
      comment: {
        content: inputText,
      },
    });

    return response.data.comment;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentAPI = async (postId, commentId) => {
  try {
    await authInstance.delete(`/post/${postId}/comments/${commentId}`);
  } catch (error) {
    console.log(error);
  }
};

export const reportCommentAPI = async (postId, commentId) => {
  try {
    await authInstance.post(`/post/${postId}/comments/${commentId}/report`);
  } catch (error) {
    console.log(error);
  }
};