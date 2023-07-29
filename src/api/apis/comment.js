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
