import authInstance from '../instance/authInstance';

export const feedAPI = async () => {
  try {
    const res = await authInstance.get('/post/feed');
    return res;
  } catch (err) {
    console.log(err);
  }
};
