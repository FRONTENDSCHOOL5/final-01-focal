import authInstance from '../instance/authInstance';

export const createPost = async (content, image) => {
  try {
    await authInstance.post('/post', {
      post: {
        content,
        image: image.join(),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId) => {
  try {
    await authInstance.delete(`/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const reportPost = async (postId) => {
  try {
    await authInstance.post(`/post/${postId}/report`);
  } catch (error) {
    console.error(error);
  }
};
