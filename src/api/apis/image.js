import baseInstance from '../instance/baseInstance';

export const getImageSrcAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await baseInstance.post('/image/uploadfile', formData);
    const {
      data: { filename },
    } = res;
    return { filename };
  } catch (err) {
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};

export const getMultiImageSrcAPI = async (files) => {
  let formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('image', files[i]);
  }

  try {
    const { data } = await baseInstance.post('/image/uploadfiles', formData);
    return data;
  } catch (err) {
    console.log(err);
    alert('서버에러입니다. 잠시후 시도해주세요');
    return new Promise(() => {});
  }
};
