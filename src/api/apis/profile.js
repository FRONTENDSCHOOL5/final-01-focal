import authInstance from '../instance/authInstance';

export const profileAPI = async (_id) => {
  try {
    const res = await authInstance.get(`profile/${_id}`);
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
