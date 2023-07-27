import authInstance from '../instance/authInstance';

export const feedAPI = async () => {
  try {
    const res = await authInstance.get('/post/feed');
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
