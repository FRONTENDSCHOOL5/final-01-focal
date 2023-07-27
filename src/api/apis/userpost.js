import authInstance from '../instance/authInstance';

export const userpostAPI = async (accountname) => {
  try {
    const res = await authInstance.get(`/post/${accountname}/userpost`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
