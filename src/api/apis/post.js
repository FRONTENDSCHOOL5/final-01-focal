import authInstance from '../instance/authInstance';

export const postDetailAPI = async (post_id) => {
  try {
    const res = await authInstance.get(`/post/${post_id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const feedAPI = async () => {
  try {
    const res = await authInstance.get('/post/feed');
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userpostAPI = async (accountname) => {
  try {
    const res = await authInstance.get(`/post/${accountname}/userpost`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
