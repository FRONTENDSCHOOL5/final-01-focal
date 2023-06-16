import styled from 'styled-components';
import React from 'react';
import Header from '../components/Header/Header';
import PostComment from '../components/Post/PostComment';
import TextInputBox from '../components/Input/TextInputBox';

const Content = styled.div`
  background-color: orange;
  width: 100%;
  height: 500px;
`;

export default function ProductUploadPage() {
  return (
    <>
      <Content />
      <Header type="basic" />
      <PostComment />
      <TextInputBox type="comment" />
    </>
  );
}
