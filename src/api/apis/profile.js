import authInstance from '../instance/authInstance';

export const profileAPI = async (_id) => {
  try {
    const res = await authInstance.get(`profile/${_id}`);
    const { profile } = res.data;
    return profile;
  } catch (err) {
    console.log(err);
  }
};
