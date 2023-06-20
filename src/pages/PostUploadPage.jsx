import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import PostUpload from '../components/Post/PostUpload';

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
  const [disabled, setDisabled] = useState(true);
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
        <PostUpload setDisabled={setDisabled} />
      </PostMainStyle>
    </>
  );
}
