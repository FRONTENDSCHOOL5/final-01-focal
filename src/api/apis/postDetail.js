import authInstance from '../instance/authInstance';

export const postDetailAPI = async (post_id) => {
  try {
    const res = await authInstance.get(`/post/${post_id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
