import baseInstance from '../instance/baseInstance';

export const getImageSrc = async (file) => {
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
