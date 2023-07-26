import authInstance from '../instance/authInstance';

export const deletePost = async (postId) => {
  try {
    await authInstance.delete(`/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};
