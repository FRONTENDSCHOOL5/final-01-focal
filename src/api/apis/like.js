import authInstance from '../instance/authInstance';

export const likeAPI = async (id, liked) => {
  try {
    const endpoint = liked ? `/post/${id}/unheart` : `/post/${id}/heart`;
    const res = await (liked
      ? authInstance.delete(endpoint)
      : authInstance.post(endpoint));
    return {
      liked: res.data.post.hearted,
      count: res.data.post.heartCount,
    };
  } catch (err) {
    console.log(err);
  }
};
