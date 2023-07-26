import authInstance from '../instance/authInstance';

export const unfollowAPI = async (accountname) => {
  try {
    authInstance.delete(`/profile/${accountname}/unfollow`);
  } catch (err) {
    console.log(err);
  }
};
