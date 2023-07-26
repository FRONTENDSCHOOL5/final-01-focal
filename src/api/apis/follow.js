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
