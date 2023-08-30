import authInstance from '../instance/authInstance';

export const followAPI = async (accountname, isFollow) => {
  try {
    await authInstance.post(`/profile/${accountname}/follow`, {
      profile: { isfollow: isFollow },
    });
  } catch (err) {
    console.log(err);
  }
};

export const unfollowAPI = async (accountname) => {
  try {
    authInstance.delete(`/profile/${accountname}/unfollow`);
  } catch (err) {
    console.log(err);
  }
};

export const followerAPI = async (accountname, limit, skip) => {
  try {
    const res = await authInstance.get(
      `/profile/${accountname}/follower?limit=${limit}&skip=${skip}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const followingAPI = async (accountname, limit, skip) => {
  try {
    const res = await authInstance.get(
      `/profile/${accountname}/following?limit=${limit}&skip=${skip}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
