import authInstance from '../instance/authInstance';

export const followerAPI = async (accountname) => {
  try {
    const res = await authInstance.get(
      `/profile/${accountname}/follower?limit=1000&skip=0`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
