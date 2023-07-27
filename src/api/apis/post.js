import authInstance from '../instance/authInstance';

export const createPostAPI = async (content, image) => {
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

export const editPostAPI = async (postId, content, image) => {
  try {
    await authInstance.put(`/post/${postId}`, {
      post: {
        content,
        image: image.join(),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePostAPI = async (postId) => {
  try {
    await authInstance.delete(`/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const reportPostAPI = async (postId) => {
  try {
    await authInstance.post(`/post/${postId}/report`);
  } catch (error) {
    console.error(error);
  }
};
