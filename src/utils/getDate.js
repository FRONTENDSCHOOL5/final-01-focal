export const getDate = (time) => {
  if (!time) {
    time = new Date();
  }

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const date = String(time.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${date}일`;
};
