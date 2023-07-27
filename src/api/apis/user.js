import authInstance from '../instance/authInstance';
import baseInstance from '../instance/baseInstance';

export const loginAPI = async (inputValue) => {
  try {
    const res = await baseInstance.post('/user/login', {
      user: inputValue,
    });
    const {
      data: { user, message },
    } = res;

    return { user, message };
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};

export const emailValidAPI = async (email) => {
  try {
    const res = await baseInstance.post('/user/emailvalid', {
      user: { email },
    });
    const {
      data: { message },
    } = res;

    return { message };
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};

export const accountnameValidAPI = async (accountname) => {
  try {
    const res = await baseInstance.post('/user/accountnamevalid', {
      user: { accountname },
    });
    const {
      data: { message },
    } = res;

    return { message };
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};

export const signupAPI = async (inputValue) => {
  try {
    const res = await baseInstance.post('/user', {
      user: inputValue,
    });
    const {
      data: { message },
    } = res;
    return { message };
  } catch (err) {
    const {
      status,
      data: { message },
    } = err.response;
    if (status === 422) {
      return Promise.reject(message);
    } else {
      alert('서버에러입니다. 잠시후 시도해주세요');
      return new Promise(() => {});
    }
  }
};

export const getMyInfoAPI = async () => {
  try {
    const {
      data: { user },
    } = await authInstance.get('/user/myinfo');
    return user;
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};

export const editMyInfoAPI = async (inputValue) => {
  try {
    const {
      data: {
        user: { accountname, image },
      },
    } = await authInstance.put('/user', {
      user: inputValue,
    });
    return { accountname, image };
  } catch (err) {
    const {
      response: {
        data: { status, message },
      },
    } = err;

    if (status === 422) {
      alert(message + ' 다시 입력해주세요');
    } else {
      alert('서버에러입니다. 잠시후 시도해주세요');
    }
    return new Promise(() => {});
  }
};

export const searchUserAPI = async (inputValue) => {
  try {
    const res = await authInstance.get(
      `/user/searchuser/?keyword=${inputValue}`,
    );
    return res;
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};
