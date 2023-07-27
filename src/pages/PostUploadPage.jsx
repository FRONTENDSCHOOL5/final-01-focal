import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import PostUpload from '../components/Post/PostUpload';
import { useNavigate } from 'react-router-dom';
import { createPostAPI } from '../api/apis/post';

const PostMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  padding: 20px 16px 20px;
  min-width: 390px;
  width: 100%;
  height: calc(100vh - 48px);
  overflow-y: auto;
`;

export default function PostUploadPage() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({ content: '', image: [] });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { content, image } = inputValue;

    if (!image.length) {
      alert('한개이상의 이미지를 첨부해주세요');
      return;
    }

    await createPostAPI(content, image);
    navigate('/profile/');
  };

  return (
    <>
      <Header
        type="upload"
        buttonText={'업로드'}
        disabled={disabled}
        buttonId={'post'}
      />
      <PostMainStyle>
        <h2 className="a11y-hidden">게시글 작성</h2>
        <PostUpload
          setDisabled={setDisabled}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleFormSubmit={handleFormSubmit}
        />
      </PostMainStyle>
    </>
  );
}
