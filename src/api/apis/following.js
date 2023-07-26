import authInstance from '../instance/authInstance';

export const followingAPI = async (accountname) => {
  try {
    const res = await authInstance.get(
      `/profile/${accountname}/following?limit=1000&skip=0`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
