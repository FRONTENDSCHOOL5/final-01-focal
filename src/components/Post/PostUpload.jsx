import { useState } from 'react';
import styled from 'styled-components';
import delteBtn from '../../assets/icons/delete.svg';
import postImgUploadBtn from '../../assets/images/image-upload.png';
import { getMultiImageSrcAPI } from '../../api/apis/image';
import useHandleResizeHeight from '../../hooks/useHandleResizeHeight';
import { alertMessage } from '../../constants/alertMessage';
import { getProperImgSrc } from '../../utils/getProperImgSrc';
import { handleImageError } from '../../utils/handleImageError';


const UserImageStyle = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
  border: 0.5px solid var(--border-color);
`;

const PostWriteArticle = styled.article`
  min-width: 300px;
  width: 100%;
`;

const PostForm = styled.form`
  width: 100%;
  padding: 12px 0;

  .post-input {
    display: block;
    width: 100%;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  .upload-photo-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
    background-image: url(${postImgUploadBtn});
    background-position: center;
    background-size: cover;
    cursor: pointer;
    z-index: 100;
  }
`;

const ImageBox = styled.ul`
  display: flex;
  gap: 8px;
  overflow-x: auto;

  & > li {
    position: relative;
    & > button {
      position: absolute;
      top: 6px;
      right: 6px;
      padding: 5.5px;
    }
    & > img {
      width: calc(100%);
      max-width: 304px;
      aspect-ratio: 168/126;
      object-fit: cover;
      border: 0.5px solid var(--border-color);
      border-radius: 10px;
    }
  }
`;

const userImgSrc = () => {
  return localStorage.getItem('image');
};

function PostUpload({
  inputValue,
  setInputValue,
  setBtnDisabled,
  handleFormSubmit,
}) {
  const { ref, handleResizeHeight } = useHandleResizeHeight(inputValue);
  const [userprofile] = useState(userImgSrc);

  const handleValueChange = (e) => {
    const { id, value } = e.target;
    if (id !== 'image') {
      setInputValue({ ...inputValue, [id]: value });
      if (value) setBtnDisabled(false);
      else setBtnDisabled(true);
    } else {
      const { files } = e.target;
      if (files.length + inputValue.image.length > 3)
        alert(alertMessage.imgMaximumLengthErr);
      else {
        getImagesSrc(files);
      }
    }
  };

  const getImagesSrc = async (files) => {
    const imageList = [];
    const data = await getMultiImageSrcAPI(files);
    for (let i = 0; i < data.length; i++) {
      imageList.push(`${process.env.REACT_APP_BASE_URL}${data[i].filename}`);
    }

    setInputValue({
      ...inputValue,
      image: [...inputValue.image, ...imageList],
    });
  };

  const handleDeleteBtnClick = (e) => {
    const { src: clickedSrc } = e.currentTarget.dataset;
    const newImageList = inputValue.image.filter((item) => item !== clickedSrc);
    setInputValue({ ...inputValue, image: newImageList });
  };

  return (
    <>
      <UserImageStyle
        src={getProperImgSrc(userprofile)}
        onError={handleImageError}
        alt="사용자이미지"
      />
      <PostWriteArticle>
        <h3 className="a11y-hidden">게시글 작성</h3>
        <PostForm onSubmit={handleFormSubmit} id="post">
          <label htmlFor="content" className="a11y-hidden">
            글 작성
          </label>
          <textarea
            ref={ref}
            className="post-input"
            id="content"
            value={inputValue.content}
            onChange={(e) => {
              handleResizeHeight();
              handleValueChange(e);
            }}
            name="text"
            placeholder="게시글 입력하기..."
          ></textarea>
          <ImageBox>
            {inputValue.image.map((item) => {
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={handleDeleteBtnClick}
                    data-src={item}
                  >
                    <img src={delteBtn} alt="사진 삭제" />
                  </button>
                  <img src={item} alt="" />
                </li>
              );
            })}
          </ImageBox>
          <label className="upload-photo-btn" htmlFor="image">
            <span className="a11y-hidden">사진업로드 버튼</span>
            <input
              id="image"
              onChange={handleValueChange}
              type="file"
              accept="image/*"
              multiple
              className="a11y-hidden"
            />
          </label>
        </PostForm>
      </PostWriteArticle>
    </>
  );
}

export default PostUpload;
